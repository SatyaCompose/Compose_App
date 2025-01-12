import { Router } from "express";
import { calculateMonthlyAttendance, calculateYearlyAttendance, clockIn, clockOut, getAttendance } from "../../attendence";

const attendenceRouter = Router();

attendenceRouter.get('/get-attendance', async (req, res) =>{
    try{
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const data = await getAttendance(token)
        res.json(data);
    }catch(err: any){
        res.status(400).json({ message: "Something went wrong" });
    }
})

attendenceRouter.get('/clock-in', async (req, res) => {
    const token: any = req.headers.authorization?.split(" ")?.[1];
    try {
        const data = await clockIn(token);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

attendenceRouter.get('/clock-out', async (req, res) => {
    const token: any = req.headers.authorization?.split(" ")?.[1];
    try {
        const data = await clockOut(token);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

attendenceRouter.post('/attendance-monthly-status', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const { year, month } = req.body
        const data = await calculateMonthlyAttendance(token, year, month-1);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

attendenceRouter.post('/attendance-yearly-status', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const { year } = req.body
        const data = await calculateYearlyAttendance(token, year);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
});

export default attendenceRouter;