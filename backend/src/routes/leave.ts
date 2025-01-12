import { Router } from "express";
import { createLeaveRequest, fetchLeavesForAdmin, fetchPendingLeaves, fetchUserLeaves, updateLeaveStatus } from "../services/leave";

export const leaveRouter = Router();

leaveRouter.get('/get-pending-leaves', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const response = await fetchPendingLeaves(token);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.post('/request-leave', async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const { title, description, noOfHours, fromDate, toDate, approver } = req?.body ?? {}
        const response = await createLeaveRequest(token, title, description, noOfHours, fromDate, toDate, approver);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-user-leaves', async(req, res) =>{
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const response = await fetchUserLeaves(token);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error fetching Pending leaves..!");
    }
});

leaveRouter.get('/get-admin-leaves', async(req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const response = await fetchLeavesForAdmin(token);
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
})