import jwt from 'jsonwebtoken';
import Leave from '../models/leave';
import User from '../models/user'

export const createLeaveRequest = async (title: string, description: string, noOfHours: string, fromDate: string, toDate: string, approver: string, user: string) => {
    try {
        const userData = await User.findOne({ email: user });
        const approverData = await User.findOne({ email: approver });

        const leave = new Leave({
            title: title,
            description: description,
            fromDate: fromDate,
            toDate: toDate,
            noOfHours: noOfHours,
            user: userData?._id,
            approver: approverData?._id,
            createdAt: new Date(),
            status: "Pending"
        });
        console.log("LEave", leave)
        await leave.save();
        return {
            status: 200,
            message: "created leave Successfully...!",
            data: leave
        }
    } catch (error) {
        console.log("Error", error)
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

export const fetchLeavesByStatus = async (token: string, status: string) => {
    try {
        const payload = jwt.decode(token);
        const { email: senderEmail }: any = payload;
        const user = await User.findOne({ email: senderEmail })
        const pendingLeaves = await Leave.find({ status: status, user: user?._id });
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

export const fetchAdminInboxLeaves = async (token: string) => {
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

export const fetchLeavesByTypes = async(token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email: senderEmail }: any = payload;
        const user = await User.findOne({ email: senderEmail });
        const leaves = await Leave.find({ user: user?._id });
        const paidLeaves = leaves.filter((data) => {
            return data?.leaveType === 'Paid Leave';
        });
        const sickLeave = leaves.filter((data) => {
            return data?.leaveType === 'Sick Leave';
        });
        const unpaidLeave = leaves.filter((data) => {
            return data?.leaveType === 'Unpaid Leave';
        });
        const pendingLeaves = leaves.filter((data) => {
            return data?.status === 'Pending';
        });
        const approvedLeaves = leaves.filter((data) => {
            return data?.status === 'Approved';
        });
        const rejectedLeaves = leaves.filter((data) => {
            return data?.status === 'Rejected';
        });
        return {
            status: 200,
            message: "Leaves are fetched successfully ...!",
            data: {
                paidLeaves: paidLeaves?.length,
                sickLeave: sickLeave?.length,
                unpaidLeave: unpaidLeave?.length,
                pendingLeaves: pendingLeaves?.length,
                approvedLeaves: approvedLeaves?.length,
                rejectedLeaves: rejectedLeaves?.length
            }
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during fetching the pending leaves by Types ...!"
        };
    }
}