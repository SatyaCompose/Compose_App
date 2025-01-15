import adminRouter from './admin';
import authRouter from './authentication';
import { userRouter } from './user';
import attendanceRouter from './attendence';
import { holidaysRouter } from './holidays';
import { leaveRouter } from './leave';
import notificationRouter from './notification';

const routes = [
    { path: '/', router: authRouter },
    { path: '/admin', router: adminRouter },
    { path: '/holidays', router: holidaysRouter },
    { path: '/user', router: userRouter },
    { path: '/user/attendance', router: attendanceRouter },
    { path: '/user/notifications', router: notificationRouter },
    { path: '/user/leave', router: leaveRouter },
];

export default routes;