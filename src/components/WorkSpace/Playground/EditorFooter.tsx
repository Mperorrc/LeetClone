import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type EditorFooterProps = {
    handleSubmit: ()=>void
};

const EditorFooter:React.FC<EditorFooterProps> = ({handleSubmit}) => {

    return (
        <div className='flex bg-dark-layer-1 w-full overflow-x-auto'>
            <div className='mx-5 my-[10px] flex justify-between w-full'>
                <div className='mx-2 flex flex-1 flex-nowrap items-center space-x-4'>
                    <button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2
                        text-dark-label-2 rounded-lg pl-3 pr-2 '
                    >
                        Console
                        <div className='ml-1 transform transition flex items-center'>
                            <BsChevronUp className='fill-dark-gray-6 nx-1 fill-gray-6' />
                        </div>
                    </button>
                </div>
                <div className='ml-auto flex items-center space-x-4 '>
                    <button className='px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2
                        text-dark-label-2 rounded-lg focus:outline-none' onClick={handleSubmit}
                    >
                        Run
                    </button>
                    <button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-green-s text-sm hover:bg-green-300
                        text-white rounded-lg focus:outline-none' onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EditorFooter;
