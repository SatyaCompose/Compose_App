import React, { useEffect, useState } from 'react';
import '../styles/UserDashboard.css';
import { User } from '../types/user';
import HolidaysBar from './HolidayBar';
import { getDashBoardHolidaysList } from '../services/holidays';
import { Holiday } from '../types/holidays';
import LeavesBar from './LeavesBar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { fetchAdmin } from '../services/admin';
import AttendanceBar from './AttendanceBar';

const AdminDashboard = () => {
    const [user, setUser] = useState<User>({});
    const [holidays, setHolidays] = useState<Holiday[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAdmin();
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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/admin/attendance-list" className="view"> View All </Link>
                            </div>
                            <h3>Clocked In Users</h3>
                            <AttendanceBar />
                        </div>

                        <div className="box">
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/holidays" className="view"> View All </Link>
                            </div>
                            <h3 style={{ padding: 30, gap: 0 }}>Up coming Holidays</h3>
                            <HolidaysBar holidays={holidays} />
                        </div>

                        <div className="box birthday-list">
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/admin/leaves-list" className="view"> View All </Link>
                            </div>
                            <h3>Employees who are on leave</h3>
                            <LeavesBar />
                        </div>

                        <div className="box notifications">
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/admin/skills-list" className="view"> View All </Link>
                            </div>
                            <h3>User Skills List</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
