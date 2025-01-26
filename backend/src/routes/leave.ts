import { Router } from "express";
import { createLeaveRequest, fetchAdminInboxLeaves, fetchLeavesByStatus, fetchLeavesByTypes, fetchUserLeaves, updateLeaveStatus } from "../services/leave";

export const leaveRouter = Router();

leaveRouter.get('/get-pending-leaves', async (req, res) => {
    try {
        const status = "Pending";
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const response = await fetchLeavesByStatus(token, status);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-approved-leaves', async (req, res) => {
    try {
        const status = "Approved";
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const response = await fetchLeavesByStatus(token, status);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-rejected-leaves', async (req, res) => {
    try {
        const status = "Rejected";
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const response = await fetchLeavesByStatus(token, status);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.post('/request-leave', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const { title, description, noOfHours, fromDate, toDate, approver } = req?.body ?? {}
        const response = await createLeaveRequest(token, title, description, noOfHours, fromDate, toDate, approver);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-user-leaves', async(req, res) =>{
    try {
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const response = await fetchUserLeaves(token);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-admin-leaves', async(req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const response = await fetchAdminInboxLeaves(token);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.post('/update-leave-status', async(req, res) => {
    try {

        const { status, leaveId } = req.body
        const response = await updateLeaveStatus(leaveId, status);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-leaves-by-types', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1] as string;
        const response = await fetchLeavesByTypes(token);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
})