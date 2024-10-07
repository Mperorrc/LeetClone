"use client"
import React, { useState } from 'react';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';

type WorkspaceProps = {
    
};
const Workspace:React.FC<WorkspaceProps> = () => {

    const [leftWidth, setLeftWidth] = useState('calc(50vw - 4px)');
  const [rightWidth, setRightWidth] = useState('calc(50vw - 4px)');
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newLeftWidth = `calc(50vw - 4px + ${e.clientX - window.innerWidth / 2}px)`;
      const newRightWidth = `calc(50vw - 4px - ${e.clientX - window.innerWidth / 2}px)`;
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
        <ProblemDescription />
      </div>
      <div
        className='bg-dark-layer-2 cursor-col-resize hover:bg-custom-blue'
        style={{ width: '8px' }}
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: rightWidth }}>
        <Playground />
      </div>
    </div>
  );
}
export default Workspace;