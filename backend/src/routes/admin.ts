import { Router } from "express";
import { fetchUser } from "../services/user";
import { getAllUsersAttendanceList, getClockedInUsersList } from "../services/attendance";
import { extractemail } from "./user";

const adminRouter = Router();

adminRouter.get('/get', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const response = await fetchUser(email);
        res.json(response);
    } catch (error) {
        throw new Error("Error at Fetching Holidays...!");
    }
});

adminRouter.get('/attendance/get-clockedIn-users-list', async (req, res) => {
    try {
        const response = await getClockedInUsersList();
        res.json(response);
    } catch (error) {
        throw new Error("Error at Fetching Holidays...!");
    }
});

adminRouter.get('/', async (req, res) => {
    try {
        const response = await getClockedInUsersList();
        res.json(response);
    } catch (error) {
        throw new Error("Error at Fetching Holidays...!");
    }
});

adminRouter.get('/attendance-list', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const data = await getAllUsersAttendanceList(email);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }

});

adminRouter.get('/leaves-list', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const data = await getAllUsersAttendanceList(email);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }

});

export default adminRouter;