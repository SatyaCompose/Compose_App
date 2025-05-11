import React, { useEffect, useState } from "react";
import { getAttendanceList } from "../services/admin";

const AttendanceList = () => {
    const [attendanceList, setAttendanceList] = useState([]);

    useEffect(() => {
        const fetchAttendanceList = async() =>{
            const response = await getAttendanceList();
            console.log(response);
            setAttendanceList(response);
        }
        fetchAttendanceList();
    }, []);

    return (
        <div>
            <h1>Attendance</h1>
            <span>{attendanceList}</span>
        </div>
    );
};

export default AttendanceList;