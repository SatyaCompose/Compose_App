import { apiClient } from "./auth"

export const getDashBoardHolidaysList = async () =>{
    const response = await apiClient.get('/holidays/get-five-holidays');
    return response.data;
}

export const getAllHolidaysList = async () => {
    const response = await apiClient.get('/holidays/get');
    return response.data;
}