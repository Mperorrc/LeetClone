"use client"
import React, { useState } from 'react';
import PreferenceNavbar from './PreferenceNavbar/PreferenceNavbar';
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';

type PlaygroundProps = {
    problem:Problem
};

const Playground:React.FC<PlaygroundProps> = ({problem}) => {
    const [topHeight, setTopHeight] = useState<string>('calc(60vh - 4px)');
    const [bottomHeight, setBottomHeight] = useState<string>('calc(40vh - 4px)');
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

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
                className="flex flex-col bg-dark-layer-1 h-[calc(100vh-94px)] w-full" 
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className='w-full flex flex-col h-[calc(100%-30px)]'>
                    
                    <div className='w-full overflow-auto' style={{ height: topHeight }}>
                        <CodeMirror 
                            value={problem.starterCode}
                            theme={vscodeDark}
                            extensions={[javascript()]}
                            style={{fontSize:16}}
                        />
                    </div>
                    <div
                        className='bg-dark-layer-2 cursor-row-resize hover:bg-custom-blue'
                        style={{ height: '8px' }}
                        onMouseDown={handleMouseDown}
                    />
                    <div className='w-full px-5 overflow-auto' style={{ height: bottomHeight }}>
                        <div className='flex h-10 items-center space-x-6 w-full'>
                            <div className='relative flex w-full h-full flex-col justify-center cursor-pointer'>
                                <div className='text-sm font-medium leading-5 text-white'>
                                    Testcases
                                </div>
                                <div className='absolute bottom-0 h-0.5 w-14 rounded-full border-none bg-white'/>
                            </div>
                        </div>

                        <div className="flex">
                            {problem.examples.map((example,index)=>{
                                return (
                                    <div className='mr-2 items-start mt-2' key={example.id}
                                        onClick={()=>{setActiveTestCaseId(example.id)}}
                                    >
                                        <div className='flex flex-wrap items-center gap-y-4'>
                                            <div className={`font-medium items-center transition-all 
                                                focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 
                                                relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                                ${activeTestCaseId === example.id?"text-white": "text-gray-500"}`
                                            }
                                            >
                                                Case {index+1}:
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>

                        <div className='font-semibold my-4'>
                            <p className='text-sm font-medium mt-4 text-white'>
                                Input:
                            </p>
                            <div className='w-full cursor-text rounded-lg border px-3 
                                py-[10px] bg-dark-fill-3 border-transparent text-white
                                mt-2 '
                            >
                                {problem.examples[activeTestCaseId].inputText}
                            </div>
                            <p className='text-sm font-medium mt-4 text-white'>
                                Output:
                            </p>
                            <div className='w-full cursor-text rounded-lg border px-3 
                                py-[10px] bg-dark-fill-3 border-transparent text-white
                                mt-2 '
                            >
                                {problem.examples[activeTestCaseId].outputText}
                            </div>
                        </div>

                    </div>
                    <div className='w-full h-[30px]'>
                        <EditorFooter />
                    </div>
                </div> 
            </div>
            
        </>
    )
}
export default Playground;