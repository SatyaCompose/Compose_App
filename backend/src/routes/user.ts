import { Router } from "express";
import { createUser, fetchUser, updateUser, uploadImage } from "../services/user";
import jwt from "jsonwebtoken";

export const userRouter = Router();

export const extractemail = (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;
        return email;
    } catch (err: any) {
        return null;
    }
}

userRouter.get("/get-user", async (req, res) =>{
    try{
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const response = await fetchUser(email)
        res.json(response)
    }catch(err: any){
        throw new Error('Error fetching user api...!')
    }
})

userRouter.get("/create-user", async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const email = extractemail(token);
        const response = await createUser(email)
        res.json(response)
    } catch (err: any) {
        throw new Error('Error fetching user api...!')
    }
})

userRouter.put("/update-user", async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const body = req.body;
        const email = extractemail(token);
        const response = await updateUser(email, body)
        res.json(response)
    } catch (err: any) {
        throw new Error('Error fetching user api...!')
    }
})

userRouter.get("/image-upload", async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const file = req.file;
        const email = extractemail(token);
        const response = await uploadImage(email, file)
        res.json(response)
    } catch (err: any) {
        throw new Error('Error fetching user api...!')
    }
})