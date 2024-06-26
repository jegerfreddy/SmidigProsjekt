import React from "react";
import { NextBtnProps } from "../../Interfaces/IButton";


export const ResumeBtn: React.FC<NextBtnProps> = ({ path }) => {
    return (
        <div className='d-flex justify-content-center align-items-center position-absolute bottom-0 start-50 translate-middle-x mb-3'>
            <button className="pinButton" onClick={() => window.location.href = `/${path}`}>
                Resume
            </button>
        </div>
    );
};
