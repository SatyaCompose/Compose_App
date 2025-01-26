import { Router } from "express";
import { createUser, fetchUser, updateUser, uploadImage } from "../services/user";

export const userRouter = Router();

userRouter.get("/get-user", async (req, res) =>{
    try{
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const response = await fetchUser(token)
        res.json(response)
    }catch(err: any){
        throw new Error('Error fetching user api...!')
    }
})

userRouter.get("/create-user", async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const response = await createUser(token)
        res.json(response)
    } catch (err: any) {
        throw new Error('Error fetching user api...!')
    }
})

userRouter.put("/update-user", async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const body = req.body
        const response = await updateUser(token, body)
        res.json(response)
    } catch (err: any) {
        throw new Error('Error fetching user api...!')
    }
})

userRouter.get("/image-upload", async (req, res) => {
    try {
        const token: any = req.headers.authorization?.split(" ")?.[1];
        const file = req.file
        const response = await uploadImage(token, file)
        res.json(response)
    } catch (err: any) {
        throw new Error('Error fetching user api...!')
    }
})