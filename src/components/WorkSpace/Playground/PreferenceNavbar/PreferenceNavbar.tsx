"use client"
import React, { useEffect, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { Isettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModal';

type PreferenceNavbarProps = {
    settings: Isettings;
    setSettings: React.Dispatch<React.SetStateAction<Isettings>>;
};

const PreferenceNavbar:React.FC<PreferenceNavbarProps> = ({settings,setSettings}) => {
    
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleFullScreen = () =>{
        if(isFullScreen){
            document.exitFullscreen();
        }
        else{
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    }

    useEffect(()=>{
        function exitHandler(){
            if(!document.fullscreenElement){
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        document.addEventListener("fullscreenchange",exitHandler);
        document.addEventListener("webkitfullscreenchange",exitHandler);
        document.addEventListener("mmozfullscreenchange",exitHandler);
        document.addEventListener("MSFullscreenChange",exitHandler);

    },[isFullScreen])

    return(
        <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
            <div className='flex items-center text-white'>
                <button className='flex cursor-pointer items-center rounded 
                    focus:outline-none bg-dark-fill-3 text-dark-label-2
                    hover:bg-dark-fill-2 px-2 py-1.5 font-medium'
                >  
                    <div className='flex items-center px-1'>
                        <div className='text-xs text-label-2 dark:text-dark-label-2 '>
                            JavaScript
                        </div>
                    </div>
                </button>
            </div>
            <div className='flex items-center m-2'>
                <button className='preferenceBtn group' onClick={()=>setSettings({...settings,settingsModalOpen:true})}
                >
                    <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                        <AiOutlineSetting />
                    </div>
                    <div className='preferenceBtn-tooltip'
                    >
                        Settings
                    </div>
                </button>
                <button className='preferenceBtn group'  onClick={handleFullScreen}
                >
                    <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                        { isFullScreen? <AiOutlineFullscreen />:<AiOutlineFullscreenExit /> }
                    </div>
                    <div className='preferenceBtn-tooltip'
                    >
                        Full screen
                    </div>
                </button>
            </div>
            {settings.settingsModalOpen && <SettingsModal settings = {settings} setSettings={setSettings} />}
        </div>
    )
}
export default PreferenceNavbar;