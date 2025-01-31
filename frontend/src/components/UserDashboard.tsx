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
import { Link } from 'react-router-dom';
import SkillsBar from './SkillsBar';

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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/user/attendance" className="view"> View All </Link>
                            </div>
                            <h3>Attendance Status</h3>
                            <AttendanceChart />
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
                                <Link to="/user/leaves" className="view"> View All </Link>
                            </div>
                            <h3>Leaves Data</h3>
                            <LeavesBar />
                        </div>

                        <div className="box notifications">
                            {/* {Array.isArray(user?.skills) && user?.skills?.length > 0 ? ( */}
                            {user?.skills && user.skills.length > 0 ? (
                                <>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Link to="/user/profile" className="view"> View All </Link>
                                    </div>
                                    <h3>Skills Acquired</h3>
                                    <SkillsBar skills={user?.skills ?? [] as string[]} />
                                </>
                            ) : (
                            <>
                                <h3>No Skills Recorded</h3>
                                <Link
                                    to="/user/profile"
                                    className="btn btn-success"
                                > Add your Skills
                                </Link>
                            </>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
