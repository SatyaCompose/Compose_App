import { apiClient } from "./auth"

export const createLeave = async (formData: any) =>{
    const response = await apiClient.post('/user/leaves/request-leave', formData);
    return response.data;
}

export const updateLeaveStatus = async (status: string, leaveId: string) => {
    const response = await apiClient.put('/user/leaves/update-leave-status', { status, leaveId });
    return response.data
}

export const getLeavesForAdminInbox = async () => {
    const response = await apiClient.get('/user/leaves/get-admin-leaves');
    return response.data;
}

export const getUserPostLeaves = async () => {
    const response = await apiClient.get('/user/leaves/get-user-leaves');
    return response.data;
}

export const getPendingLeaves = async () => {
    const response = await apiClient.get('/user/leaves/get-pending-leaves');
    return response.data;
}

export const getApprovedLeaves = async () =>{
    const response = await apiClient.get('/user/leaves/get-approved-leaves');
    return response.data;
}

export const getRejectedLeaves = async () => {
    const response = await apiClient.get('/user/leaves/get-rejected-leaves');
    return response.data;
}

export const getLeavesDataByTypes = async () =>{
    const response = await apiClient.get('/user/leaves/get-leaves-by-types');
    return response.data;
}
