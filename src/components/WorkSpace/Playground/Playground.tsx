"use client"
import React, { useState } from 'react';
import PreferenceNavbar from './PreferenceNavbar/PreferenceNavbar';

type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    const [topHeight, setTopHeight] = useState<string>('calc(60vh - 4px)');
    const [bottomHeight, setBottomHeight] = useState<string>('calc(40vh - 4px)');
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleMouseDown = (): void => {
        setIsDragging(true);
    };

    const handleMouseUp = (): void => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (isDragging) {
            const newTopHeight = `calc(60vh - 4px + ${e.clientY - window.innerHeight * 0.6}px)`;
            const newBottomHeight = `calc(40vh - 4px - ${e.clientY - window.innerHeight * 0.6}px)`;
            setTopHeight(newTopHeight);
            setBottomHeight(newBottomHeight);
        }
    };
    return (
        <>
            <PreferenceNavbar />
            <div 
                className="flex flex-col h-[calc(100vh-94px)] w-full" 
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className='' style={{ height: topHeight }}>
                    a
                </div>
                <div
                    className='bg-dark-layer-2 cursor-row-resize hover:bg-custom-blue'
                    style={{ height: '8px' }}
                    onMouseDown={handleMouseDown}
                />
                <div className='' style={{ height: bottomHeight }}>
                    a
                </div>
            </div>
        </>
    )
}
export default Playground;