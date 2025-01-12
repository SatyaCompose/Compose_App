import jwt from 'jsonwebtoken';
import Leave from '../models/leave';
import User from '../models/user'

export const createLeaveRequest = async (title: string, description: string, fromDate: string, toDate: string, noOfHours: number, token: string, approver: string) => {
    try {
        const payload = jwt.decode(token);
        const { email: senderEmail }: any = payload;
        const user = await User.findOne({ email: senderEmail })
        const approverData = await User.findOne({ email: approver })
        const leave = new Leave({
            title: title,
            description: description,
            fromDate: fromDate,
            toDate: toDate,
            noOfHours: noOfHours,
            user: user?._id, // Employee's ObjectId
            approver: approverData?._id,
            createdAt: new Date(),
            status: "Pending"
        });
        await leave.save();
        return {
            status: 200,
            message: "created leave Successfully...!",
            data: leave
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during creating the leave ..!"
        };
    }
};

export const updateLeaveStatus = async (leaveId: string, status: string) => {
    try {
        const leave = await Leave.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true }
        );
        return {
            status: 200,
            message: "updated leave fetched Successfully...!",
            data: leave
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during updating the leave..!"
        };
    }
};

export const fetchPendingLeaves = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email: senderEmail }: any = payload;
        const user = await User.findOne({ email: senderEmail })
        const pendingLeaves = await Leave.find({ status: "Pending", user: user?._id });
        return {
            status: 200,
            message: "Pending leaves fetched Successfully...!",
            data: pendingLeaves
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during fetching the pending leaves..!"
        };
    }
};

export const fetchUserLeaves = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email: senderEmail }: any = payload;
        const user = await User.findOne({ email: senderEmail });
        const leaves = await Leave.find({ user: user?._id });
        return {
            status: 200,
            message: "Leaves are fetched successfully ...!",
            data: leaves
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during fetching the pending leaves..!"
        };
    }
}

export const fetchLeavesForAdmin = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;
        const user = await User.findOne({ email });
        const leaves = await Leave.find({ approver: user?._id });
        return {
            status: 200,
            message: "Leaves are fetched successfully ...!",
            data: leaves
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during fetching the pending leaves..!"
        };
    }
}