import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import '../styles/UserDashboard.css';
import '../styles/NotificationForm.css'
import Select from 'react-select';
import Button from '@mui/material/Button';
import NotificationIcon from './NotificationIcon';
import { ProfileAvatar } from './ProfileAvatar';
import { fetchUser } from '../services/user';
import { User } from '../types/user';
import Navbar from './Navbar';

const NotificationForm = () => {
    const [type, setType] = useState('');
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        hours: '',
        cause: '',
        leaveType: '',
        date: '',
    });

    const options = [
        { value: "leave", label: "Leave" },
        { value: "working-hours", label: "Working Hours Adjustment" },
        { value: "general", label: "General" }
    ];

    const handleDateInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.type === "date" && inputElement.showPicker) {
            inputElement.showPicker(); // Safely invoke showPicker if supported
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    console.log("FORMDATA", formData)
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="dashboard">
                <Navbar />
            </div>
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
                    <div className='form-div'>
                        <form className='notification-form' onSubmit={handleSubmit}>
                            <h1>Notification Form</h1>

                            <Select
                                placeholder="Type"
                                options={options}
                                onChange={(e: any) => setType(e?.value)}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        borderColor: "#ccc",
                                        borderRadius: "4px",
                                        padding: "5px",
                                        boxShadow: "none",
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? "#4CAF50" : "#fff",
                                        color: state.isFocused ? 'white' : "#000",
                                        cursor: "pointer",
                                    })
                                }}
                                required />

                            {type === 'leave' && (
                                <>
                                    <select
                                        name="leaveType"
                                        onChange={handleChange}
                                        value={formData.leaveType || ""}
                                        aria-labelledby="leaveTypeLabel"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Leave Type
                                        </option>
                                        <option value="single">Single Day Leave</option>
                                        <option value="long">Long Leave</option>
                                    </select>
                                    {formData?.leaveType !== '' ? (
                                        formData.leaveType === 'single' ? (
                                            <>
                                                <input
                                                    type="date"
                                                    name="Date"
                                                    onChange={handleChange}
                                                    onClick={handleDateInputClick}
                                                    placeholder="Date"
                                                    required />
                                                <input
                                                    type="number"
                                                    name="hours"
                                                    onChange={handleChange}
                                                    placeholder="No. of Hours"
                                                    min="1"
                                                    max="24"
                                                    required />
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    onChange={handleChange}
                                                    onClick={handleDateInputClick}
                                                    placeholder="Start Date"
                                                    required />
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    onChange={handleChange}
                                                    onClick={handleDateInputClick}
                                                    placeholder="End Date"
                                                    required />
                                            </>
                                        )
                                    ) : null}


                                    <textarea
                                        name="cause"
                                        onChange={handleChange}
                                        placeholder="Leave the Proper Reason here ...!"
                                        required />
                                </>
                            )}


                            {type === "working-hours" && (
                                <>
                                    <input placeholder='Date' type="date" name="date" onChange={handleChange} required />
                                    <input placeholder='From' type="time" name="start-hours" onChange={handleChange} required />
                                    <input placeholder='To' type="time" name="end-hours" onChange={handleChange} required />
                                    <textarea placeholder='Cause' name="cause" onChange={handleChange} required />
                                </>
                            )}

                            {type === 'general' && (
                                <>
                                    <input placeholder='title' type="title" name="startDate" onChange={handleChange} required />
                                    <input placeholder='Subject' type="subject" name="endDate" onChange={handleChange} required />
                                    <textarea placeholder='Body' name="body" onChange={handleChange} required />
                                </>
                            )}

                            <Button
                                type="submit"
                                aria-valuetext=''
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 15,
                                    backgroundColor: "#4CAF50",
                                    color: 'white'
                                }}
                            >Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationForm;
