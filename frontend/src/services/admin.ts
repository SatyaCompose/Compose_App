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