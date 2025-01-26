import React, { useEffect, useState } from "react";
import { Leaves } from "../types/leaves";
import '../styles/LeavesBar.css'
import { DEFAULT_PAID_LEAVES, DEFAULT_SICK_LEAVES } from "../common/contstant";
import { getLeavesDataByTypes } from "../services/leaves";

interface LeavesBarProps {
    holidays?: Leaves[]
}

interface LeavesData {
    paidLeaves?: number;
    sickLeave?: number;
    unpaidLeave?: number;
    pendingLeaves?: number;
    approvedLeaves?: number;
    rejectedLeaves?: number;
}

const LeavesBar: React.FC<LeavesBarProps> = () => {
    const [leavesData, setLeavesData] = useState<LeavesData>({
        paidLeaves: 0,
        sickLeave: 0,
        unpaidLeave: 0,
        pendingLeaves: 0,
        approvedLeaves: 0,
        rejectedLeaves: 0
    })
    const { paidLeaves = 0, sickLeave = 0, unpaidLeave = 0, pendingLeaves = 0, approvedLeaves = 0, rejectedLeaves = 0 } = leavesData
    useEffect(() => {
        const fetchPendingLeaves = async () => {
            try {
                const leavesData = await getLeavesDataByTypes();
                setLeavesData(leavesData?.data)
            } catch (error) {
                console.log("ERROR: at pending leaves count...!")
            }
        }

        fetchPendingLeaves();
    },[]);

    const leaves = [
        {
            id: 1,
            statement: 'Total Paid Leaves left',
            count: DEFAULT_PAID_LEAVES - paidLeaves
        },
        {
            id: 2,
            statement: 'Total Sick Leaves left',
            count: DEFAULT_SICK_LEAVES - sickLeave
        },
        {
            id: 3,
            statement: 'Total Unpaid Leaves Used',
            count: unpaidLeave || 0
        },
        {
            id: 4,
            statement: 'Pending Leaves',
            count: pendingLeaves || 0
        },
        {
            id: 5,
            statement: 'Approved Leaves',
            count: approvedLeaves || 0
        },
        {
            id: 6,
            statement: 'Rejected Leaves',
            count: rejectedLeaves || 0
        }
    ];

    return (
        <div className="leave-list">
            {leaves?.slice(0, 5).map((leave: any) => {
                return (
                    <div key={leave.id} className="leave-row">
                        <span className="leave-name">{leave.statement}</span>
                        <span className="leave-date">{leave.count}</span>
                    </div>
                );
            })}
        </div>

    )
}

export default LeavesBar;