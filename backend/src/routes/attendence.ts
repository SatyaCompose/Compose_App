import { Router } from "express";
import { calculateMonthlyAttendance, calculateYearlyAttendance, clockIn, clockOut, getAttendance } from "../services/attendance";
import { extractemail } from "./user";

const attendanceRouter = Router();

attendanceRouter.get('/get-attendance', async (req, res) =>{
    try{
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const data = await getAttendance(email)
        res.json(data);
    }catch(err: any){
        res.status(400).json({ message: "Something went wrong" });
    }
})

attendanceRouter.get('/clock-in', async (req, res) => {
    const token: any = req.headers.authorization?.split(" ")?.[1];
    try {
        const email = extractemail(token);
        const data = await clockIn(email);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

attendanceRouter.get('/clock-out', async (req, res) => {
    const token: any = req.headers.authorization?.split(" ")?.[1];
    try {
        const email = extractemail(token);
        const data = await clockOut(email);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

attendanceRouter.post('/attendance-monthly-status', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const { year, month } = req.body
        const data = await calculateMonthlyAttendance(email, year, month-1);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

attendanceRouter.post('/attendance-yearly-status', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const { year } = req.body
        const email = extractemail(token);
        const data = await calculateYearlyAttendance(email, year);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

export default attendanceRouter;