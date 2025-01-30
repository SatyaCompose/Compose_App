import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material';
import { ProfileAvatar } from './ProfileAvatar';
import { fetchUser, updateUser } from '../services/user';
import '../styles/Profile.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomTextField from './ProfileTextField';
import { User } from '../types/user';
import Navbar from './Navbar';
import SkillsBar from './SkillsBar';

const ProfilePage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [user, setUser] = useState<User>({});
    const [newSkill, setNewSkill] = useState('');
    const [openSkillDialog, setOpenSkillDialog] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        mobile: '',
        address: '',
        employeeNumber: '',
        designation: '',
        department: '',
        dateOfJoining: '',
        salaryInfo: '',
        bankAcNumber: '',
        ifscCode: '',
        skills: []
    });

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await fetchUser(); // Assuming fetchUser is a function that fetches the user data from backend
                if (data && data.status === 200) {
                    const userData = data?.data?.[0] || {} as User;
                    setUser(userData);
                    setFormData({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        gender: userData.gender || '',
                        dateOfBirth: userData.dateOfBirth || '',
                        email: userData.email || '',
                        mobile: userData.mobile || '',
                        address: userData.address || '',
                        employeeNumber: userData.employeeNumber || '',
                        designation: userData.designation || '',
                        department: userData.department || '',
                        dateOfJoining: userData.dateOfJoining || '',
                        salaryInfo: userData.salaryInfo || '',
                        bankAcNumber: userData.bankAcNumber || '',
                        ifscCode: userData.ifscCode || '',
                        skills: userData.skills || []
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    // Handle form field change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        console.log("FIELDNAME", fieldName);
        console.log("TARGET", e.target.value);
        setFormData((prevFormData) => ({
            ...prevFormData, // Keep existing values
            [fieldName]: e.target.value, // Update only the changed field
        }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setFormData((prev: any) => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
            setOpenSkillDialog(false);
        }
    };

    const handleSkillDialogClose = () => {
        setOpenSkillDialog(false);
        setNewSkill('');
    };

    // Handle Save Changes
    const handleSaveChanges = async () => {
        try {
            const data = await updateUser(formData); // Assuming updateUser is a function that sends updated data to the backend
            if (data && data.status === 200) {
                setUser(data?.data || {});
                console.log('User data updated successfully');
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <div className="dashboard">
                <Navbar />
            </div>
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
                    <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
                        <Tabs value={tabIndex} onChange={handleTabChange} centered>
                            <Tab label="User Details" />
                            <Tab label="Change Password" />
                            <Tab label="Delete Account" />
                        </Tabs>

                        <Box className='UserData-Box' sx={{ mt: 4 }}>
                            {tabIndex === 0 && (
                                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <ProfileAvatar name={(user?.firstName ?? '') + (user?.lastName ?? '')} height={150} size='5rem' />
                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, marginTop: 80 }}>
                                        <CustomTextField label='First Name' defaultValue={formData?.firstName} mb={4} onChange={(e) => handleChange(e, 'firstName')} />
                                        <CustomTextField label='Last Name' defaultValue={formData?.lastName} mb={4} onChange={(e) => handleChange(e, 'lastName')} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40 }}>
                                        <CustomTextField label='Gender' defaultValue={formData?.gender} mb={4} onChange={(e) => handleChange(e, 'gender')} />
                                        <CustomTextField label='Date of Birth' defaultValue={formData?.dateOfBirth} mb={4} onChange={(e) => handleChange(e, 'dateOfBirth')} />
                                    </div>
                                    <div
                                        style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, }}
                                    >
                                        <CustomTextField label='Email' defaultValue={formData?.email} mb={2} onChange={(e) => handleChange(e, 'email')} />
                                        <CustomTextField label='Mobile' defaultValue={formData?.mobile} mb={2} onChange={(e) => handleChange(e, 'mobile')} />
                                    </div>

                                    <div
                                        style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, }}
                                    >
                                        <CustomTextField label='Address' defaultValue={formData?.address} mb={4} onChange={(e) => handleChange(e, 'address')} />
                                        <CustomTextField label='Employee Number' defaultValue={formData?.employeeNumber} mb={4} onChange={(e) => handleChange(e, 'employeeNumber')} />
                                    </div>

                                    <div
                                        style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, }}
                                    >
                                        <CustomTextField label='Designation' defaultValue={formData?.designation} mb={4} onChange={(e) => handleChange(e, 'designation')} />
                                        <CustomTextField label='Department' defaultValue={formData?.department} mb={4} onChange={(e) => handleChange(e, 'department')} />
                                    </div>
                                    <div
                                        style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, }}
                                    >
                                        <CustomTextField label='Date of joining' defaultValue={formData?.dateOfJoining} mb={4} onChange={(e) => handleChange(e, 'dateOfJoining')} />
                                        <CustomTextField label='Salary Info' defaultValue={formData?.salaryInfo} mb={4} onChange={(e) => handleChange(e, 'salaryInfo')} />
                                    </div>

                                    <div
                                        style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, }}
                                    >
                                        <CustomTextField label='Bank A/C Number' defaultValue={formData?.bankAcNumber} mb={4} onChange={(e) => handleChange(e, 'bankAcNumber')} />
                                        <CustomTextField label='IFSC code' defaultValue={formData?.ifscCode} mb={4} onChange={(e) => handleChange(e, 'ifscCode')} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 40, }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, maxWidth: 840 }}>
                                            {formData.skills?.length > 0 ? (
                                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                                    <div>
                                                        <span className='skillheading' style={{ justifyContent: 'flex-start', fontSize: 20, fontWeight: 'bold', width: '100%' }}> Skills</span>
                                                    </div>
                                                    <div style={{ padding: 10 }}>
                                                        <SkillsBar skills={formData.skills} />
                                                        <IconButton onClick={() => setOpenSkillDialog(true)} sx={{ ml: 2 }}>
                                                            <AddCircleOutlineIcon style={{ color: '#4CAF50', padding: 2 }} />
                                                            <span className='skillbtn' style={{ fontSize: 20, color: '#4CAF50', padding: 2, fontWeight: 500 }}> Add Skill </span>
                                                        </IconButton>

                                                    </div>
                                                    </div>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        '&:hover': { opacity: 0.8 }
                                                    }}
                                                    onClick={() => setOpenSkillDialog(true)}
                                                >
                                                    <AddCircleOutlineIcon sx={{ mr: 1 }} htmlColor='#4CAF50' />
                                                    <span style={{ color: '#4CAF50' }}>Add Skill</span>
                                                </Box>
                                            )}
                                        </Box>
                                    </div>

                                    {/* Add Skill Dialog */}
                                    <Dialog open={openSkillDialog} onClose={handleSkillDialogClose}>
                                        <DialogTitle>Add New Skill</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                label="Skill Name"
                                                type="text"
                                                fullWidth
                                                variant="outlined"
                                                value={newSkill}
                                                sx={{
                                                    mb: 4,
                                                    "& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "#4CAF50", // Set border color to green when focused
                                                        },
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        "&.Mui-focused": {
                                                            color: "#4CAF50", // Optional: Set label color to green when focused
                                                        },
                                                    },
                                                }}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleSkillDialogClose} style={{ color: '#4CAF50' }}>Cancel</Button>
                                            <Button onClick={handleAddSkill} variant="contained">Add</Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Button variant="contained" style={{ marginTop: 20, width: '20%', alignSelf: 'center' }} onClick={handleSaveChanges}>Save Changes</Button>
                                </Box>
                            )}
                            {tabIndex === 1 && (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}  >
                                    <CustomTextField label='Current Password' defaultValue='' mb={4} onChange={(e) => handleChange(e, 'currentPassword')} />
                                    <CustomTextField label='New Password' defaultValue='' mb={4} onChange={(e) => handleChange(e, 'NewPassword')} />
                                    <CustomTextField label='Confirm Password' defaultValue='' mb={4} onChange={(e) => handleChange(e, 'confirmPassword')} />
                                    <Button variant="contained">Change Password</Button>
                                </Box>
                            )}
                            {tabIndex === 2 && (
                                <Box sx={{ textAlign: 'center', color: 'red' }}>
                                    <p>Deleting your account is irreversible. Please confirm.</p>
                                    <Button variant="contained" color="error">
                                        Delete Account
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </div >
            </div >
        </>
    );
};

export default ProfilePage;
