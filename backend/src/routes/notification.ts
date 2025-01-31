import { Router } from "express";
import { getNotifications, sendNotifications } from "../services/notification";
import { extractemail } from "./user";

const notificationRouter = Router();

notificationRouter.get('/notifications', async (req, res) => {
    try{
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const response = await getNotifications(email);
        res.json(response);
    }catch(err: any){
        throw new Error("Error fetching notifications..!");
    }
})

notificationRouter.post('/send-notification', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1] ?? '';
        const { body, title, subject, isAnnouncement, recipients } = req.body;
        const email = extractemail(token);
        const response = await sendNotifications(body, title, subject, isAnnouncement, recipients, email);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching notifications..!");
    }
})

export default notificationRouter;