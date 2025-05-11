import React, { useEffect, useState } from "react";
import { getLeaveList } from "../services/admin";

const LeaveList = () =>{
    const [leaveList, setLeaveList] = useState([]);

    useEffect(() => {
        const fetchLeavelist = async () => {
        const response = await getLeaveList();
        console.log(response);
        setLeaveList(response);
        };
        fetchLeavelist();
    }, []);

    return(
        <div>
            <h1>Leaves List</h1>
            <span>{leaveList}</span>
        </div>
    )

}

export default LeaveList;