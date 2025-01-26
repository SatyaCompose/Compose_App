import React from "react";

const SectionTitle = ({ text }: { text: string }) => {
    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    margin: "16px 0",
                    maxWidth: "839.17px auto",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        height: "1.5px",
                        backgroundColor: "#4ACF50",
                        marginRight: "8px",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: "100px"
                    }}
                />
                <span
                    style={{
                        marginRight: "12px",
                        fontWeight: "bold",
                        color: "#4ACF50",
                        whiteSpace: "nowrap",
                    }}
                >
                    {text}
                </span>
                <div
                    style={{
                        flex: 1,
                        height: "1.5px",
                        backgroundColor: "#4ACF50",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default SectionTitle;
