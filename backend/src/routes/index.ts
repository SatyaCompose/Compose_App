import adminRouter from './adminRouter';
import authRouter from './authenticationRoutes';
import { userRouter } from './routes';
import attendenceRouter from './routes/attendenceRouter';
import { holidaysRouter } from './routes/holidays';
import { leaveRouter } from './routes/leaveRouter';
import notificationRouter from './routes/notification';

const routes = [
    { path: '/', router: authRouter },
    { path: '/admin', router: adminRouter },
    { path: '/user', router: userRouter },
    { path: '/holidays', router: holidaysRouter },
    { path: '/user', router: attendenceRouter },
    { path: '/user', router: notificationRouter },
    { path: '/user', router: leaveRouter },
];

export default routes;