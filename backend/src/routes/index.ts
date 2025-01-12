import adminRouter from './admin';
import authRouter from './authentication';
import { userRouter } from './user';
import attendenceRouter from './attendence';
import {holidaysRouter} from './holidays';
import { leaveRouter } from './leave';
import notificationRouter from './notification';

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