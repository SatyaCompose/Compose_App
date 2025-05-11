import { apiClient } from "./auth";

export const fetchAdmin = async () => {
    try {
        const response = await apiClient.get("/admin/get");
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return { status: 500, data: null };
    }
};

export const fetchClockedInusers = async () => {
    try {
        const response = await apiClient.get("/admin/attendance/get-clockedIn-users-list");
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return { status: 500, data: null };
    }
};

export const getAttendanceList = async () => {
    try{
        const response = await apiClient.get('/admin/attendance-list');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance list:", error);
        return { status: 500, data: null };
    }
};

export const getLeaveList = async () => {
    try {
        const response = await apiClient.get('/admin/leave-list');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance list:", error);
        return { status: 500, data: null };
    }
};

export const getSkillsList = async () => {
    try {
        const response = await apiClient.get('/admin/skills-list');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance list:", error);
        return { status: 500, data: null };
    }
};