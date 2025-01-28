import React, { useEffect, useState } from 'react';
import '../styles/NotificationForm.css'
import Select from 'react-select';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchUser } from '../services/user';
import { createLeave } from '../services/leaves';

const NotificationForm = () => {
    const [type, setType] = useState('');
    const [leavePeriod, setLeavePeriod] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        noOfHours: '',
        title: '',
        description: '',
        leaveType: '',
        user: userEmail,
        approver: 'admin@compose.co.in'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUser();
                if (data?.status === 200) {
                    const userData = data?.data?.[0] || {};
                    setUserEmail(userData?.email || '');
                }
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };
        fetchData();
    }, []); // Ensure this runs only once


    const options = [
        { value: "leave", label: "Leave" },
        { value: "working-hours", label: "Working Hours Adjustment" },
        { value: "general", label: "General" }
    ];

    const leaveTypes = [
        { label: "Paid Leave", value: "Paid Leave" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Unpaid Leave", value: "Unpaid Leave" }
    ];

    const leavePeriodOptions = [
        { label: "Single Day Leave", value: "single" },
        { label: "Long Leave", value: "long" }
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

    useEffect(() => {
        if (userEmail) {
            setFormData((prev) => ({
                ...prev,
                user: userEmail,
            }));
        }
    }, [userEmail]);
    console.log("FORM", formData)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (type === 'leave') {
            if (!formData) {
                console.error("Missing required fields for leave request");
                return;
            }

            try {
                const response = await createLeave(formData);
                console.log('Leave request created:', response);
            } catch (error) {
                console.error('Error creating leave request:', error);
            }
        }
    };

    let leaveTypeInput: JSX.Element | null = null;

    if (leavePeriod !== '') {
        if (leavePeriod === 'single') {
            leaveTypeInput = (
                <>
                    <input
                        type="Date"
                        name="fromDate"
                        onChange={handleChange}
                        onClick={handleDateInputClick}
                        style={{ padding: 10 }}
                        placeholder="Date"
                        required
                    />
                    <input
                        type="number"
                        name="noOfHours"
                        onChange={handleChange}
                        placeholder="No. of Hours"
                        min="1"
                        max="24"
                        style={{ padding: 10 }}
                        required
                    />
                </>
            );
        } else {
            leaveTypeInput = (
                <>
                    <input
                        type="Date"
                        name="fromDate"
                        onChange={handleChange}
                        onClick={handleDateInputClick}
                        style={{ padding: 10 }}
                        placeholder="Start Date"
                        required
                    />
                    <input
                        type="Date"
                        name="toDate"
                        onChange={handleChange}
                        onClick={handleDateInputClick}
                        style={{ padding: 10 }}
                        placeholder="End Date"
                        required
                    />
                </>
            );
        }
    }

    return (
        <>
            <div className="dashboard">
                <Navbar />
            </div>
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
                    <div className='form-div'>
                        <form className='notification-form' onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                                <h1 style={{ textAlign: 'center', flexGrow: 1, padding: 20 }}>Notification Form</h1>
                            </div>

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
                                    <Select
                                        placeholder="Leave Type"
                                        options={leaveTypes}
                                        value={leaveTypes.find((type) => type.value === formData.leaveType) || null} // Ensures compatibility with controlled form inputs
                                        name="leaveType"
                                        onChange={(selectedOption) =>
                                            handleChange({ target: { name: "leaveType", value: selectedOption?.value } } as any)
                                        }
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

                                    <Select
                                        name="leavePeriod"
                                        placeholder="Leave Period"
                                        options={leavePeriodOptions}
                                        onChange={(selectedOption: { value: string; label: string } | null) =>
                                            setLeavePeriod(selectedOption?.value ?? "")
                                        }
                                        value={leavePeriodOptions.find((option) => option.value === leavePeriod) || null}
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
                                                color: state.isFocused ? "white" : "#000",
                                                cursor: "pointer",
                                            }),
                                        }}
                                        required
                                    />

                                    {leaveTypeInput}

                                    <input
                                        placeholder='Title'
                                        name='title'
                                        onChange={handleChange}
                                        style={{ padding: 10 }}
                                        required
                                    />

                                    <textarea
                                        name="description"
                                        onChange={handleChange}
                                        style={{ padding: 10 }}
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
