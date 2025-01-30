import React from "react";
import '../styles/SkillsBar.css';

interface SkillProps {
    skills: string[];
}

const SkillsBar: React.FC<SkillProps> = ({ skills }) => {
    const isSkillsExisted = skills?.length > 0;
    console.log(isSkillsExisted);
    return (
        <div style={{ margin: 10 }}>
            {isSkillsExisted ? (
                <div className="skills-container">
                    {skills?.map((skill: string, index: number) => (
                        <div key={index} className="skill-item">
                            <span className="skill-name">{skill}</span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
};

export default SkillsBar;