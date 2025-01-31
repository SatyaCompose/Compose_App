import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Holiday } from "../types/holidays";
import { getAllHolidaysList } from "../services/holidays";
import WorkDay from '../assets/Work-day.webp';
import HolidayImage from '../assets/holiday.png';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 


export const HolidaysPage = () => {
    const [holidays, setHolidays] = useState<Holiday[]>([])
    useEffect(() => {
        const fetchHolidays = async () => {
            const response = await getAllHolidaysList();
            const holidaysList = response?.data?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setHolidays(holidaysList);
        }
        fetchHolidays()
    }, [])

    const midIndex = Math.ceil(holidays.length / 2);
    const table1Holidays = holidays.slice(0, midIndex);
    const table2Holidays = holidays.slice(midIndex);

    const currentDate = new Date().toLocaleDateString('en-GB');
    const isHoliday = holidays.some((holiday: Holiday) => holiday.date === currentDate);
    const year = new Date().getFullYear();
    return (
        <div>
            <Navbar />
            <div className="content-area" style={{ padding: 50, margin: 100 }}>
                <div className="main-content">
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

                        <h1 style={{ textAlign: 'center', flexGrow: 1, padding: 20 }}>Holidays List For the Year {year}</h1>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                            padding: "20px",
                        }}
                    >
                        {/* Table 1 */}
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: "48%",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                border: "1px solid #ddd",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            textAlign: "center",
                                            backgroundColor: "#dff0d8",
                                            fontSize: 18,
                                            fontWeight: "bolder"

                                        }}
                                    >
                                        Date
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            textAlign: "center",
                                            backgroundColor: "#dff0d8",
                                            fontSize: 18,
                                            fontWeight: "bolder"
                                        }}
                                    >
                                        Holiday
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {table1Holidays.map((holiday, index) => (
                                    <tr key={holiday._id}>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                textAlign: 'center',
                                                fontSize: 18,
                                            }}
                                        >
                                            {new Date(holiday.date as string).toLocaleDateString('en-GB')}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                fontSize: 18,
                                            }}
                                        >
                                            {holiday.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Table 2 */}
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: "48%",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                border: "1px solid #ddd",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            textAlign: "center",
                                            backgroundColor: "#dff0d8",
                                            fontSize: 18,
                                            fontWeight: "bolder"
                                        }}
                                    >
                                        Date
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            textAlign: "center",
                                            backgroundColor: "#dff0d8",
                                            fontSize: 18,
                                            fontWeight: "bolder"
                                        }}
                                    >
                                        Holiday
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {table2Holidays.map((holiday, index) => (
                                    <tr key={holiday?._id}>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                fontSize: 18,
                                            }}
                                        >
                                            {new Date(holiday.date as string).toLocaleDateString('en-GB')}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                fontSize: 18,
                                            }}
                                        >
                                            {holiday.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="box">
                        <h1>What about Today?...</h1>
                        {isHoliday ? (
                            <img
                                alt="Today is Holiday"
                                src={HolidayImage}
                                width="700"
                                height="700"
                            />
                        ) : (
                            <img
                                alt="Work day at office"
                                src={WorkDay}
                                width="700"
                                height="700"
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolidaysPage;
