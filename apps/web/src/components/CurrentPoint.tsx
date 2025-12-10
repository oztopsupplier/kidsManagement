import React from "react";
import { mockUser } from "../mockUser";

type CurrentPointProps = object;

const CurrentPoint: React.FC<CurrentPointProps> = () => {
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "scale(1.1)";
    };
    
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "scale(1)";
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "scale(1)";
    };
    
    return (
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div 
                className={`bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl p-8 md:p-10 text-white mb-6 md:mb-8 text-center shadow-2xl transform hover:scale-105 transition-transform`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-2xl">🏆 Your Points</span>
                </div>
                {/* Points definition need to be changed later */}
                <div className="text-7xl md:text-8xl mb-3">{mockUser.points}</div>
                <div className="flex items-center justify-center gap-2 text-xl">
                    <span>Every point shows your hard work!</span>
                </div>
            </div>
        </div>
    );
}

export default CurrentPoint;