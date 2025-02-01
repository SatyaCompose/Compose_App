import jwt from 'jsonwebtoken';
import Notification from '../models/notification';
import User from '../models/user'
import { Response } from '../common/response';

/**
 * create notifivations in database
 * @param recipients 
 * @param title 
 * @param subject 
 * @param body 
 * @param isBroadcast 
 * @param senderEmail 
 * @returns 
 */
const sendEmail = async (recipients: any, title: string, subject: string, body: string, isBroadcast: boolean, senderEmail: string) => {
    const notifications = recipients.map((email: any) => ({
        from: senderEmail,
        to: email,
        title: title,
        subject: subject,
        body: body,
        isBroadcast: isBroadcast,
        read: false, // default unread
        status: 'pending' // Initial status for new notifications
    }));

    return await Notification.insertMany(notifications);
};


/**
 * get notifications by email
 * @param token 
 * @returns 
 */
export const getNotifications = async (token: string): Promise<Response> => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;

        const notifications = await Notification.find({ email: email }).sort({ createdAt: -1 });;

        return {
            status: 200,
            message: "Notifications fetched successfully..!",
            data: notifications
        }
    } catch (err: any) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during fetching the notification..!"
        }
    }
};

/**
 * create Notifications
 * @param body 
 * @param title 
 * @param subject 
 * @param isAnnouncement 
 * @param recipients 
 * @param token 
 * @returns 
 */
export const sendNotifications = async (body: string, title: string, subject: any, isAnnouncement: boolean, recipients: string[], token: string): Promise<Response> => {
    try {
        let recipientsData = [];
        const payload = jwt.decode(token);
        const { email: senderEmail }: any = payload;
        const isBroadcast = isAnnouncement;

        if (isBroadcast) {
            const users = await User.find();
            recipientsData = users.map((user: any) => ({ email: user.email, status: 'unread' }));
        } else {
            const users = await User.find({ _id: { $in: recipients } });
            recipientsData = users.map((user: any) => ({ email: user.email, status: 'unread' }));
        }

        try {
            const notification = await sendEmail(recipientsData, title, subject, body, isBroadcast, senderEmail);
            const notificationIds = notification.map((notif: any) => notif._id);
            await Notification.updateMany(
                { _id: { $in: notificationIds } },
                { status: 'sent' }
            );

            return {
                status: 200,
                message: 'Email and notifications sent successfully!',
                data: notification
            };
        } catch (error) {
            throw new Error('Error at sending mails..!');
        }
    } catch (err: any) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during sending the notification..!"
        };
    }
};

/**
 * marks as read
 * @param notificationId 
 * @returns 
 */
export const markAsRead = async (notificationId: string): Promise<Response> => {
    try {
        const ids = notificationId.split('|')?.map((id) => id.trim());

        if (ids && ids.length > 0) {
            const updatedNotifications = await Promise.all(
                ids.map(async (id: string) => {
                    return Notification.findByIdAndUpdate(
                        id,
                        { read: true },
                        { new: true } // Returns the updated document
                    );
                })
            );

            return {
                status: 200,
                message: 'Notifications marked as read',
                data: updatedNotifications
            };
        } else {
            return {
                status: 400,
                message: 'No valid notification IDs provided',
                data: []
            };
        }

    } catch (error) {
        return {
            status: 400,
            message: 'Error marking notification as read',
            data: error
        };
    }
};
