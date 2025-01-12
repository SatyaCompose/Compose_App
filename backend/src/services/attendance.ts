import Attendance from '../models/attendence';
import CompanyHoliday from '../models/Holidays'
import jwt from 'jsonwebtoken';
import { DAILY_WORK_HOURS } from '../common/constant';

const calculateTotalHours = (clockIn: Date, clockOut: Date): number => {
    const hours = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
    return Math.round(hours * 100) / 100;
};

export const clockIn = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;
        const clockIn = new Date();

        // Find attendance for today
        let attendance = await Attendance.findOne({ email: email, date: new Date().toISOString().slice(0, 10) });

        if (!attendance) {
            // Create new attendance document if none exists for today
            attendance = await Attendance.create({ email: email, date: new Date().toISOString().slice(0, 10), sessions: [{ clockIn }] });
        } else {
            // Check if last clock-in lacks a clock-out
            const lastSession = attendance.sessions[attendance.sessions.length - 1];
            if (lastSession && !lastSession.clockOut) {
                return {
                    status: 400,
                    statusText: "Bad Request",
                    message: "Previous clock-in session not clocked out yet..!"
                };
            }
            // Add a new clock-in session
            attendance.sessions.push({ clockIn });
            await attendance.save();
        }

        return {
            status: 200,
            message: "ClockIn Successful..!",
            data: attendance
        };
    } catch (error: any) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong with ClockIn..!",
        };
    }
};

export const clockOut = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;
        const clockOut = new Date();

        // Find today's attendance record
        const attendance = await Attendance.findOne({ email: email, date: new Date().toISOString().slice(0, 10) });

        if (!attendance) {
            return {
                status: 400,
                statusText: "Bad Request",
                message: "No clock-in found for today..!"
            };
        }

        // Get the last session and ensure it has a clock-in but no clock-out
        const lastSession = attendance.sessions[attendance.sessions.length - 1];
        if (!lastSession || lastSession.clockOut) {
            return {
                status: 400,
                statusText: "Bad Request",
                message: "No open clock-in session to clock out..!"
            };
        }

        // Calculate total hours for this session and update it
        const totalHours = calculateTotalHours(lastSession.clockIn, clockOut);
        lastSession.clockOut = clockOut;
        lastSession.totalHours = totalHours;

        // Save the updated attendance record
        await attendance.save();

        return {
            status: 200,
            message: "ClockOut Successful..!",
            data: attendance
        };
    } catch (error: any) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong with ClockOut..!",
        };
    }
};

const fetchCompanyHolidays = async (): Promise<string[]> => {
    const holidays = await CompanyHoliday.find({}, { date: 1, _id: 0 }); // Fetch only the 'date' field
    return holidays.map((holiday) => holiday.date.toISOString().split('T')[0]); // Convert to 'YYYY-MM-DD'
};

const isWeekend = (date: Date): boolean => {
    const day = date.getUTCDay();
    return day === 6 || day === 0;
};

const isHoliday = async (date: Date, companyHolidays: string[]): Promise<boolean> => {
    const dateString = date.toISOString().split('T')[0];
    return companyHolidays.includes(dateString);
};

export const getWorkingDaysInMonth = async (year: number, month: number): Promise<number> => {
    const holidays = await fetchCompanyHolidays(); // Fetch holidays once
    const date = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    let workingDays = 0;

    while (date.getUTCMonth() === month) {
        if (!isWeekend(date) && !(await isHoliday(date, holidays))) {
            workingDays++;
        }
        date.setUTCDate(date.getUTCDate() + 1);
    }

    return workingDays;
};

export const calculateMonthlyAttendance = async (token: string, year: number, month: number) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;
        const workingDays = await getWorkingDaysInMonth(year, month);
        const totalRequiredHours = workingDays * DAILY_WORK_HOURS;

        const startDate = new Date(Date.UTC(year, month, 1));
        const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

        const attendanceRecords = await Attendance.find({
            email: email,
            date: { $gte: startDate.toISOString().split('T')[0], $lte: endDate.toISOString().split('T')[0] }
        });

        const actualWorkedHours = attendanceRecords.reduce((total, record) => {
            const dayTotal = record.sessions.reduce((daySum, session) => daySum + (session.totalHours || 0), 0);
            return total + dayTotal;
        }, 0);

        const attendancePercentage = actualWorkedHours > totalRequiredHours ? 100 : ((actualWorkedHours / totalRequiredHours) * 100);

        const status = `${Math.round(attendancePercentage)}%`;

        const difference = Math.abs(actualWorkedHours - totalRequiredHours);
        return {
            status: 200,
            message: "monthly status fetched successfully",
            data: {
                email,
                month: `${year}-${month + 1}`,
                totalRequiredHours,
                actualWorkedHours,
                difference,
                attendancePercentage: Math.round(attendancePercentage),
                status
            }
        };
    } catch (error) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Error calculating monthly attendance..!",
        };
    }
};

export const calculateYearlyAttendance = async (token: string, year: string) => {
    try {

        const payload = jwt.decode(token);
        const { email }: any = payload;

        let totalRequiredHours = 0;
        let actualWorkedHours = 0;

        for (let month = 0; month < 12; month++) {
            const workingDays = await getWorkingDaysInMonth(Number(year), month);
            totalRequiredHours += workingDays * DAILY_WORK_HOURS;

            const startDate = new Date(Date.UTC(Number(year), month, 1, 0, 0, 0));
            const endDate = new Date(Date.UTC(Number(year), month + 1, 0, 23, 59, 59));

            const attendanceRecords = await Attendance.find({
                email,
                date: { $gte: startDate.toISOString().split('T')[0], $lte: endDate.toISOString().split('T')[0] }
            });

            // Calculate total worked hours for each month
            actualWorkedHours += attendanceRecords.reduce((total, record) => {
                const dayTotal = record.sessions.reduce((daySum, session) => daySum + (session.totalHours || 0), 0);
                return total + dayTotal;
            }, 0);
        }

        const attendancePercentage =  actualWorkedHours > totalRequiredHours ? 100 : ((actualWorkedHours / totalRequiredHours) * 100);

        const status = `${Math.round(attendancePercentage)}%`;

        const difference = Math.abs(actualWorkedHours - totalRequiredHours);

        return {
            status: 200,
            message: "yearly status fetched successfully..!",
            data: 
            {
            email,
            year,
            totalRequiredHours,
            actualWorkedHours,
            difference,
            attendancePercentage: Math.round(attendancePercentage),
            status
        }
        };
    } catch (error) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Error calculating yearly attendance..!",
        };
    }
};

export const getAttendance = async (token: string) => {
    try{
        const payload = jwt.decode(token);
        const { email }: any = payload;
        const response = await Attendance.find({email});
        return{
            status: 200,
            message: "Attendance fetched successfully",
            data: response
        }
    }catch(error: any){
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Error fetching attendance..!",
        };
    }
}