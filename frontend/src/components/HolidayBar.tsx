import React, { useState } from "react";
import { Holiday } from "../types/holidays";
import '../styles/Holidays.css'

interface HolidayBarProps {
    holidays?: Holiday[]
}

const HolidaysBar: React.FC<HolidayBarProps> = ({ holidays }) => {
    
    return (
        <div className="holiday-list">
            {holidays
                ?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
                ?.slice(0, 5)
                ?.map((holiday) => {
                    const formattedDate = holiday.date
                        ? new Date(holiday.date).toLocaleDateString('en-GB')
                        : 'N/A';
                    return (
                        <div key={formattedDate} className="holiday-row">
                            <span className="holiday-date">{formattedDate}</span>
                            <span className="holiday-name">{holiday.description}</span>
                        </div>
                    );
                })}
        </div>


    )
}

export default HolidaysBar;