import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Box, Tab, Tabs } from "@mui/material";
import { Leaves } from "../types/leaves";
import { getApprovedLeaves, getPendingLeaves, getRejectedLeaves } from "../services/leaves";

export const LeavesPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [leaves, setLeaves] = useState<Leaves[]>([])

    useEffect(() => {
        const fetchLeaves = async () => {
            if (tabIndex === 0) {
                const response = await getPendingLeaves();
                setLeaves(response?.data)
            } else if (tabIndex === 1) {
                const response = await getApprovedLeaves();
                setLeaves(response?.data)
            } else if (tabIndex === 2) {
                const response = await getRejectedLeaves();
                setLeaves(response?.data)
            }
        }
        fetchLeaves();
    }, [tabIndex]);
    console.log(leaves)
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div>
            <Navbar />
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
                    <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
                        <Tabs value={tabIndex} onChange={handleTabChange} centered>
                            <Tab label="Pending Leaves" />
                            <Tab label="Approved Leaves" />
                            <Tab label="Rejected leaves" />
                        </Tabs>

                        <Box className='UserData-Box' sx={{ mt: 4 }}>
                            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                <div className="leave-row" style={{ padding: 10 }}>
                                    <span className="" style={{ flex: 1, padding: 10, fontSize: 18, fontWeight: 480 }}>created Date</span>
                                    <span className="leave-title" style={{ flex: 7, textAlign: 'center', padding: 10, fontSize: 18, fontWeight: 480 }}>Leave Title</span>
                                    <span className="leave-status" style={{flex: 1, textAlign: 'center', padding: 10, fontSize: 20, fontWeight: 480}}>Leave Approval Status</span>
                                </div>
                                {leaves?.map((leave: Leaves) => {
                                    return (
                                        <div key={leave._id} className="leave-row" style={{ padding: 10}}>
                                            <span className="" style={{ flex: 1, padding: 10, fontSize: 18, fontWeight: 480 }}>{new Date(leave?.createdAt as string).toLocaleDateString('en-GB')}</span>
                                            <span className="leave-title" style={{ flex: 7, textAlign: 'left', padding: 10, fontSize: 18, fontWeight: 480 }}>{leave.title}</span>
                                            <span className="leave-status" style={{
                                                flex: 1, textAlign: 'center', padding: 10, backgroundColor: leave.status === 'Pending' ? '#ffcd74' : 'transparent',
                                                color: leave.status === 'Pending' ? 'white' : 'inherit', fontSize: 20, fontWeight: 480 }}>{leave.status}</span>
                                        </div>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}