import CompanyHoliday from '../models/HolidaysModel'; // Import your CompanyHoliday model

interface Holidays {
    date: string;
    description: string;
}

export const uploadHolidays = async (holidays: Holidays[]) => {
    try {
        console.log("H", holidays)
        const formattedHolidays = holidays.map((holiday: Holidays) => {
            const [day, month, year] = holiday.date.split('/');
            const formattedDate = new Date(`${year}-${month}-${day}`); // Convert to yyyy-mm-dd
            return {
                date: formattedDate,
                description: holiday.description.trim(),
            };
        });
        // Insert holiday data into the database
        const data = await CompanyHoliday.insertMany(formattedHolidays);
        return {
            status: 200,
            message: "Holidays Updated Succcessfully...!",
            data: data
        };
    } catch (error) {
        console.error('Error adding holidays:', error);
    }
};

export const getDashBoardHolidaysList = async () => {
    try {
        const today = new Date(); // Get today's date
        today.setHours(0, 0, 0, 0); // Normalize to the start of the day
        console.log("DATE", today)
        // Fetch the next 5 holidays
        const nextHolidays = await CompanyHoliday.find({ date: { $gte: today } })
            .sort({ date: 1 }) // Sort by date in ascending order
            .limit(5); // Limit to 5 holidays

        return {
            status: 200,
            message: 'Next 5 holidays fetched successfully.',
            data: nextHolidays,
        };
    } catch (error) {
        return {
            status: 500,
            message: 'Error fetching holidays.',
            error: error,
        };
    }
}