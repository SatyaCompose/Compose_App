import User from '../models/user';
import { Response } from '../common/response';
/**
 * Fetch user By email
 * @param email 
 * @returns 
 */
export const fetchUser = async (email: string): Promise<Response> => {
    try {
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

/**
 * Create user while register
 * @param email 
 * @returns 
 */
export const createUser = async (email: string): Promise<Response> =>  {
    try {
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

/**
 * Update user by email
 * @param email 
 * @param body 
 * @returns 
 */
export const updateUser = async (email: string, body: any): Promise<Response> => {
    try {
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

/**
 * Upload image for user
 * @param email 
 * @param file 
 * @returns 
 */
export const uploadImage = async (email: string, file: any): Promise<Response> => {
    try {
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

        return {
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

/**
 * Get multiple users by emails Array
 * @param emails 
 * @returns 
 */
export const getMultipleUsers = async (emails: string[]): Promise<Response> => {
    try {
        const users = await User.find({ email: { $in: emails } });
        return {
            status: 200,
            message: "Users fetched successfully..!",
            data: users
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return {
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
}

/**
 * Get All users except current user
 * @param email 
 * @returns 
 */
export const getAllUsers = async (email: string): Promise<Response> => {
    try {
        const users = await User.find({ email: { $ne: email } });
        return {
            status: 200,
            message: "Users fetched successfully..!",
            data: users
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return{
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
};

export const getlUsersSkills = async (email: string): Promise<Response> => {
    try {
        const users = await User.find({ email: { $ne: email } });

        const emails = users.map((user) => user.email);

        emails?.map((email) => {
            const user = users?.filter((user) => user.email === email)?.[0];
            return{
                email: email,
                userSkills: user?.skills,
                userName: `${user?.firstName} ${user?.lastName}`,
            }
        });
        return {
            status: 200,
            message: "Users fetched successfully..!",
            data: users
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return {
            status: 400,
            statusText: "Bad request",
            message: "Something went wrong during fetchUser..!"
        }
    }
};