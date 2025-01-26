import React, { useEffect, useState } from 'react';
import '../styles/UserDashboard.css';
import AttendanceChart from './AttendenceChart';
import { fetchUser } from '../services/user';
import { User } from '../types/user';
import HolidaysBar from './HolidayBar';
import { getDashBoardHolidaysList } from '../services/holidays';
import { Holiday } from '../types/holidays';
import LeavesBar from './LeavesBar';
import Navbar from './Navbar';

const UserDashboard = () => {
    const [user, setUser] = useState<User>({});
    const [holidays, setHolidays] = useState<Holiday[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUser();
                if (data?.status === 200) {
                    const userData = data?.data?.[0] || {};
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };
        const getFiveHolidays = async () => {
            try {
                const response = await getDashBoardHolidaysList();
                if (response?.status === 200) {
                    setHolidays(response.data)
                }
            } catch (error) {
                console.error("Error at Get dashboard Holidays list:", error);
            }
        }
        fetchData();
        getFiveHolidays();
    }, []);

    return (
        <>
            <div className="dashboard">
                <Navbar />
            </div>
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
                    <h1>Welcome {user?.firstName}!!!</h1>
                    <div className="dashboard-grid">
                        <div className="box">
                            <h2 style={{ padding: 30 }}>Attendance Status</h2>
                            <AttendanceChart />
                        </div>

                        <div className="box">
                            <h2 style={{ padding: 30, gap: 0 }}>Up coming Holidays</h2>
                            <HolidaysBar holidays={holidays} />
                        </div>

                        <div className="box birthday-list">
                            <h2>Upcoming Leaves</h2>
                            <LeavesBar />
                        </div>

                        <div className="box notifications">
                            <h2>Skills Acquired</h2>
                            {/* Content for Notifications */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
