"use client"
import React, { useState } from 'react';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '@/utils/types/problem';

type WorkspaceProps = {
    problem : Problem
};
const Workspace:React.FC<WorkspaceProps> = ({problem}) => {

    const [leftWidth, setLeftWidth] = useState('calc(50vw - 4px)');
  const [rightWidth, setRightWidth] = useState('calc(50vw - 4px)');
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isDragging) {
        const minRightWidth = window.innerHeight * 0.4; 
        const totalWidth = window.innerWidth - 8;

        let newRightWidth = `calc(50vw - 4px - ${e.clientX - window.innerWidth / 2}px)`;
        let newRightWidthPixels = (window.innerWidth / 2 - 4 - (e.clientX - window.innerWidth / 2));

        if (newRightWidthPixels < minRightWidth) {
            newRightWidthPixels = minRightWidth;
            newRightWidth = `${minRightWidth}px`;
        }

        const newLeftWidthPixels = totalWidth - newRightWidthPixels;
        const newLeftWidth = `${newLeftWidthPixels}px`;

        setLeftWidth(newLeftWidth);
        setRightWidth(newRightWidth);
    }
};

  return (
    <div 
      className="w-full flex flex-row relative text-white" 
      style={{ height: 'calc(100vh - 50px)' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ width: leftWidth }}>
        <ProblemDescription problem={problem} />
      </div>
      <div
        className='bg-dark-layer-2 cursor-col-resize hover:bg-custom-blue'
        style={{ width: '8px' }}
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: rightWidth }}>
        <Playground problem={problem}/>
      </div>
    </div>
  );
}
export default Workspace;