import React, { useEffect, useState } from "react";
import { User } from "../types/user";
import { fetchClockedInusers } from "../services/admin";
import "../styles/AttendanceBar.css";

interface ClockedInUsers{
    user: User;
    clockedInTime: string;
}
const AttendanceBar = () => {
    const [clockedInUsers, setClockedInUsers] = useState<ClockedInUsers[]>([]);

    useEffect(() => {
        const fetchClockedInUsers = async () => {
            try {
                const response = await fetchClockedInusers();
                const data = response?.data;
                console.log("DATA", data);
                setClockedInUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClockedInUsers();
    },[])
    return (
        <div className="attendace-list">
            <div key={0} className="attendace-row">
                <span className="attendace-date">Logged In User</span>
                <span className="attendace-date">Last ClockIn</span>
            </div>
            {clockedInUsers?.map((clockedInUser: ClockedInUsers, index: number) => {
                return (
                    <div key={index} className="attendace-row">
                        <span className="attendace-date">{clockedInUser?.user?.firstName} {clockedInUser?.user?.lastName}</span>
                        <span className="attendace-date">{clockedInUser?.clockedInTime}</span>
                    </div>
                )
            })
            }
        </div>
    );
};
export default AttendanceBar;