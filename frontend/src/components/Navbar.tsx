import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import '../styles/UserDashboard.css';
import { ProfileAvatar } from './ProfileAvatar';
import NotificationIcon from './NotificationIcon';
import { fetchUser } from '../services/user';
import { User } from '../types/user';

const Navbar = () =>{
    const [user, setUser] = useState<User>({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUser();
                if (data && data.status === 200) {
                    const userData = data?.data?.[0] || {};
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        fetchData();
    }, []);
    return(
        <div className="navbar">
            <div className="logo-container">
                <img src={logo} alt="Company Logo" className="Logo zoomed" />
            </div>
            <div className="menu-list-container">
                <ul className="menu-list">
                    <li>
                        <Link to="/user/dashboard" className="link">
                            <DashboardIcon style={{ marginRight: 8 }} /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/profile" className="link">
                            <PersonIcon style={{ marginRight: 8 }} /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/notification-form" className="link sidebar-item">
                            <NotificationsIcon style={{ marginRight: 8 }} /> Notification Form
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/attendance" className="link">
                            <EventAvailableIcon style={{ marginRight: 8 }} /> Attendance
                        </Link>
                    </li>
                    <li>
                        <Link to="/sign-out" className="link">
                            <LogoutIcon style={{ marginRight: 8 }} /> Logout
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="right-section">
                <div className="notification-container">
                    <NotificationIcon count={3} />
                </div>
                <div className="profile-container" style={{ marginLeft: 50, marginRight: 30 }}>
                    <ProfileAvatar name={(user?.firstName ?? '') + (user?.lastName ?? '')} height={80} size="2.5rem" />
                </div>
            </div>
        </div>
    )
};

export default Navbar;