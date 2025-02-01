import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Response } from '../common/response';

const blacklist: Set<string> = new Set();

export const registeUser = async (payload: any): Promise<Response> => {
    try {
        const match = await User.findOne({ email: payload.email });
        if (match) {
            return {
                status: 400,
                statusText: "Bad Request",
                message: "User already exists..!"
            }
        }
        const data = await User.create(payload);
        return {
            status: 200,
            message: 'User Registered Successfully..!',
            data: data
        };

    } catch (err: any) {
        console.error("ERROR", err)
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong during register..!",
            data: err
        };
    }
}

export const loginUser = async (email: string, password: string): Promise<Response> => {
    try {
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return {
                status: 400,
                statusText: "Bad Request",
                message: "User does not exist",
            };
        }

        const isPasswordCorrect = password.trim() === userExist.password.trim();
        if (!isPasswordCorrect) {
            return {
                status: 400,
                statusText: "Bad Request",
                message: "Password incorrect!",
            };
        }

        const access_token = jwt.sign(
            { email: userExist.email, role: userExist.role },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        const refresh_token = jwt.sign(
            { email: userExist.email, role: userExist.role },
            'refresh_token_secret', // Use a different secret for refresh tokens
            { expiresIn: '1d' } // Longer expiration for refresh tokens
        );

        return {
            status: 200,
            message: "User logged in successfully!",
            data: {
                accessToken: access_token,
                refreshToken: refresh_token,
                role: userExist.role,
            },
        };
    } catch (err: any) {
        console.error("Error during login:", err);
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong during Login!",
        };
    }
};

export const refreshAccessToken = async (token: string): Promise<Response> => {
    try {
        const payload = jwt.verify(token, 'refresh_token_secret') as jwt.JwtPayload;

        if (!payload) {
            return {
                status: 403,
                statusText: "Forbidden",
                message: "Invalid or expired refresh token!",
            };
        }

        const { email, role } = payload;
        const newAccessToken = jwt.sign(
            { email: email, role: role },
            'your_secret_key', // Use the same secret as access tokens
            { expiresIn: '1h' }
        );

        return {
            status: 200,
            message: "Access token updated successfully!",
            data: { accessToken: newAccessToken },
        };
    } catch (err: any) {
        console.error("Error refreshing token:", err);
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong while refreshing the token!",
        };
    }
};

export const logoutUser = async (token: any): Promise<Response> => {
    if (!token) {
        return {
            status: 403,
            statusText: "Forbidden",
            message: "Invalid access token!",
        };
    }

     verifyToken(token);
    try {
        // Verify the token
        blacklist.add(token);
        return{
            status: 200,
            message: "Logged Out Successfully..!",
            data: blacklist
        };
    } catch (error) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong while logout..!",
        };
    }
}

export const verifyToken = (token: string) => {
    try {
        const response = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual key
        return response;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Token verification failed");
    }
};

export const refreshToken = async (): Promise<Response> => {
    try{
        const newAccessToken = jwt.sign(
            { company: "Compose", type: "refresh" },
            'refresh_token_secret',
            { expiresIn: '1d' }
        );
        return {
            status: 200,
            message: "Logged Out Successfully..!",
            data: newAccessToken
        };
    } catch (error) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: "Something went wrong while creating refreshToken..!",
        };
    }
}


