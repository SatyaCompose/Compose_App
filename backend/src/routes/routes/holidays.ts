import { Router } from "express";
import { getDashBoardHolidaysList, getHolidays, uploadHolidays } from "../../holidays";

export const holidaysRouter = Router();

holidaysRouter.post('/upload', async (req, res) => {
    try {
        const { data: holidays } = req.body
        console.log("HOLIDAYS", req.body);
        const response = await uploadHolidays(holidays);
        res.json(response);
    } catch (err: any) {
        throw new Error("Error updating the holidays..!");
    }
})

holidaysRouter.get('/get-five-holidays', async(req, res) => {
    try{
        const response = await getDashBoardHolidaysList();
        res.json(response)
    }catch(error){
        throw new Error("Error fetching Holidays..!");
    }
});

holidaysRouter.get('/get', async(req, res) => {
    try{
        const response = await getHolidays();
        res.json(response);
    }catch(error){
        throw new Error("Error at Fetching Holidays...!");
    }
});