import { Router } from 'express';
import { loginUser, logoutUser, refreshAccessToken, refreshToken, registeUser } from '../authentication';

const authRouter = Router();

const blockList: Set<string> = new Set();

authRouter.post('/register', async(req, res) => {
    try {
        const payload = req.body
        const response = await registeUser(payload);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error during user register...!');
    }
});

authRouter.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const response = await loginUser(email, password);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error during user login...!');
    }
});

authRouter.post('/refresh-access-token', async (req, res) => {
    try {
        const { token } = req.body
        const response = await refreshAccessToken(token);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error during user login...!');
    }
});

authRouter.get('/refresh-token', async (req, res) => {
    try {
        const response = await refreshToken();
        res.json(response);
    } catch (error) {
        res.status(500).send('Error during generating refresh token...!');
    }
});

authRouter.post('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const response = await logoutUser(token);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error during user logout...!');
    }
});

export const isTokenBlockListed = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Authorization token is missing' });
    }

    if (blockList.size && blockList?.has(token)) {
        return res.status(401).json({ message: 'Token is blockListed' });
    }

    next();
};


export default authRouter;
