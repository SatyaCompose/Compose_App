import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Menu,
    MenuItem,
    IconButton,
    Paper,
    Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { clockIn, clockOut, getAttendances } from '../services/attendance';
import { CLOCK_IN_TEXT, FULL_ATTENDANCE_TEXT, getLast10Days, MINIMAL_ATTENDANCE_TEXT, NO_ATTENDANCE_TEXT, PARTIAL_ATTENDANCE_TEXT } from '../common/contstant';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const AttendancePage = () => {
    const clockInStatus = localStorage.getItem('clockin-status') ?? false;
    const [isClockedIn, setIsClockedIn] = useState(Boolean(clockInStatus));
    const [currentTime, setCurrentTime] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState<{ date: string; status: string; }[]>([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleClockToggle = async () => {
        try {
            if (isClockedIn) {
                // Clock-Out logic
                await clockOut();
                localStorage.setItem('clockin-status', `${false}`)
                setIsClockedIn(false);
            } else {
                // Clock-In logic
                await clockIn();
                localStorage.setItem('clockin-status', `${true}`)
                setIsClockedIn(true);
            }
        } catch (error) {
            console.error("Error toggling clock-in/out:", error);
        }
    };

    const handleMenuClick = (event: any) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const processAttendanceData = useCallback((data: any[], isClockedIn: boolean) => {
        const fetchStatus = (date: string) => {
            const statusData = data.find((entry: any) => entry?.date === date);

            if (!statusData) return "No data available";

            const totalHours = statusData.sessions?.reduce(
                (sum: any, session: any) => sum + session.totalHours,
                0
            );

            if (isClockedIn && date === getCurrentDate()) {
                return CLOCK_IN_TEXT;
            }

            if (totalHours >= 8) {
                return FULL_ATTENDANCE_TEXT;
            } else if (totalHours >= 4) {
                return PARTIAL_ATTENDANCE_TEXT;
            } else if (totalHours > 0) {
                return MINIMAL_ATTENDANCE_TEXT;
            } else {
                return NO_ATTENDANCE_TEXT;
            }
        };

        const last10Days = getLast10Days();
        return last10Days.map((day) => ({
            date: day.isoDate,
            status: fetchStatus(day.isoDate),
        }));
    }, []);

    useEffect(() => {
        const fetchAttendance = async () => {
            const data = await getAttendances();
            const attendanceList = processAttendanceData(data?.data || [], isClockedIn);
            setAttendanceData(attendanceList);
        };
        fetchAttendance();
    }, [isClockedIn, processAttendanceData]);

    // Helper function to get the current date in ISO format
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };


    return (
        <div className="dashboard">
            <Navbar />
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
                    <Box>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '40px',
                                height: '40px',
                                border: '0.12rem solid green', // Green border
                                borderRadius: '50%', // Makes it circular
                                backgroundColor: 'white', // White background 
                                }}>
                                <Link to="/user/dashboard" className="view">
                                    <ArrowBackIcon style={{ fontSize: '1.75rem' }} />
                                </Link>
                            </div>

                            <h1 style={{ textAlign: 'center', flexGrow: 1 }}>Attendance Status</h1>
                        </div>

                        {/* Clock-in/Clock-out Section */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                            <Box>
                                <strong>Current Time:</strong> {currentTime.toLocaleTimeString()}
                            </Box>
                            <Button
                                variant="contained"
                                onClick={handleClockToggle}
                                sx={{
                                    backgroundColor: isClockedIn ? "#f44336" : "#4CAF50",
                                    color: "#fff",
                                    fontWeight: 700,
                                    "&:hover": {
                                        backgroundColor: isClockedIn ? "#d32f2f" : "#388e3c",
                                    },
                                }}
                            >
                                {isClockedIn ? "Clock-Out" : "Clock-In"}
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ flexGrow: 1, padding: 2 }}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ alignItems: 'center', backgroundColor: '#dff0d8' }}>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attendanceData.map((row) => (
                                            <TableRow key={row.date}>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={handleMenuClick}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                    >
                                                        <MenuItem onClick={handleMenuClose}>Regularize</MenuItem>
                                                        <MenuItem onClick={handleMenuClose}>Apply Leave</MenuItem>
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default AttendancePage;
