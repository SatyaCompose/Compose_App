import User from '../models/user';
import jwt from 'jsonwebtoken'

export const fetchUser = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;

        const res = await User.find({ email });

        return {
            status: 200,
            message: "User Fetched Successfully",
            data: res
        }
    } catch (err: any) {
        return {
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
}

export const createUser = async (token: string) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;

        const userExist = await User.find({ email });

        if (userExist) {
            return {
                status: 400,
                statusText: "Bad Request",
                message: "user already existed..!"
            }
        }
        const res = await User.create({ email });

        return {
            status: 200,
            message: "User created Successfully",
            data: res
        }
    } catch (err: any) {
        return {
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
}

export const updateUser = async (token: string, body: any) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;

        const {
            firstName,
            lastName,
            employeeNumber,
            department,
            designation,
            dateOfJoining,
            address,
            mobile,
            alternateMobile,
            bank,
            bankAcNumber,
            ifscCode,
            salaryInfo,
            gender,
            dateOfBirth,
            skills,
        } = body

        const userExist = await User.findOne({ email });
        console.log("USER", userExist)
        if (!userExist) {
            const newUser = new User({
                email,
                firstName,
                lastName,
                employeeNumber,
                department,
                designation,
                dateOfJoining,
                address,
                mobile,
                alternateMobile,
                bank,
                bankAcNumber,
                ifscCode,
                salaryInfo,
                gender,
                dateOfBirth,
                skills,
            });

            const savedUser = await newUser.save();

            return {
                status: 201,
                message: "User created successfully",
                data: savedUser
            };
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                firstName,
                lastName,
                employeeNumber,
                department,
                designation,
                dateOfJoining,
                address,
                mobile,
                alternateMobile,
                bank,
                bankAcNumber,
                ifscCode,
                salaryInfo,
                gender,
                dateOfBirth,
                skills,
            },
            { new: true } // Return the updated document
        );
        return {
            status: 200,
            message: "user updated successfully...!",
            data: updatedUser
        }

    } catch (err: any) {
        return {
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
}

export const uploadImage = async (token: string, file: any) => {
    try {
        const payload = jwt.decode(token);
        const { email }: any = payload;

        const res = await User.findOneAndUpdate(
            { email },
            {
                image: {
                    data: file.buffer,
                    contentType: file.mimetype
                }
            },
            { new: true } 
        );

        return{
            status: 200,
            message: "Image uploaded successfully..!",
            data: res
        }
    } catch (error) {
        return {
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
}
