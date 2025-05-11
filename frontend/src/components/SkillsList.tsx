import React, { useEffect, useState } from "react";
import { getSkillsList } from "../services/admin";

const SkillsList = () => {
    const [skills, setSkills] = useState([]);

    useEffect(()=>{
        const fetchSkillsList = async () => {
            const response = await getSkillsList();
            console.log(response);
            setSkills(response);
        }
        fetchSkillsList();
    }, [])
    return (
        <div>
            <h1>Skills</h1>
            <span>{skills}</span>
        </div>
    )
}

export default SkillsList;