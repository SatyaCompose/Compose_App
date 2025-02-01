import jwt from 'jsonwebtoken';
import Leave from '../models/leave';
import User from '../models/user'
import { getAllUsers } from './user';
import { User as UserData } from '../types/user';
import { Leaves } from '../types/leaves';
import { Response } from '../common/response';

/**
 * create Leave
 * @param title 
 * @param description 
 * @param noOfHours 
 * @param fromDate 
 * @param toDate 
 * @param approver 
 * @param user 
 * @returns 
 */
export const createLeaveRequest = async (title: string, description: string, noOfHours: string, fromDate: string, toDate: string, approver: string, user: string): Promise<Response> => {
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

/**
 * update leave
 * @param leaveId 
 * @param status 
 * @returns 
 */
export const updateLeaveStatus = async (leaveId: string, status: string): Promise<Response> => {
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

/**
 * Get leaves by status
 * @param token 
 * @param status 
 * @returns 
 */
export const fetchLeavesByStatus = async (email: string, status: string): Promise<Response> => {
    try {
        const user = await User.findOne({ email: email });
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

/**
 * Get User all leaves
 * @param email 
 * @returns 
 */
export const fetchUserLeaves = async (email: string): Promise<Response> => {
    try {
        const user = await User.findOne({ email: email });
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

/**
 * Get all Admin inbox leaves
 * @param token 
 * @returns 
 */
export const fetchAdminInboxLeaves = async (token: string): Promise<Response> => {
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

/**
 * fetch leaves by types
 * @param token 
 * @returns 
 */
export const fetchLeavesByTypes = async (email: string): Promise<Response> => {
    try {
        const user = await User.findOne({ email: email });
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

export const fetchUsersLeaveList = async (email: string): Promise<Response> => {
    try {
        let userName: string = "";
        let userId: string = "";

        const users = await getAllUsers(email);
        const emails = users?.data?.map((user: UserData) => user.email);
        const promise = emails.map(async (email: string) => {
            const fetchLeaveStatus = await fetchLeavesByTypes(email);
            const leaves = await fetchLeavesByStatus(email, 'Approved');
            const leaveDates = leaves?.data?.map((leave: Leaves) => {
                return `${leave?.fromDate} - ${leave?.toDate}`
            });

            users?.data.map((user: UserData) => {
                if (user.email === email) {
                    userName = `${user?.firstName} ${user?.lastName}`;
                    userId = user?._id as string;
                }
            })

            return {
                userId: userId,
                email: email,
                approvedLeaves: fetchLeaveStatus?.data?.approvedLeaves,
                userName: userName,
                leavesDates: leaveDates
            }
        })

        const leaves = await Promise.all(promise);
        return {
            status: 200,
            message: "Leaves are fetched successfully ...!",
            data: leaves
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad Request",
            message: "Error during fetching the pending leaves by Types ...!"
        };
    }
}
