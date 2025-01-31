import { Router } from "express";
import { fetchUser, getMultipleUsers } from "../services/user";
import { getClockedInUsersList } from "../services/attendance";
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

// adminRouter.get('/get-all-users', async (req, res) => {
//     try {
//         const response = await getMultipleUsers();
//         res.json(response);
//     } catch (error) {
//         throw new Error("Error at Fetching Holidays...!");
//     }
// });

export default adminRouter;