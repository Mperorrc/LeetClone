"use client"
import { firestore } from '@/firebase/firebase';
import { DBProblem } from '@/utils/types/problem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';

type ProblemsTableProps = {
    
};

const ProblemsTable:React.FC<ProblemsTableProps> = () => {
    
    console.log("ref 2");
    const [youtubePlayer, setYoutubePlayer] = useState({
        isOpen:false,
        videoId:"",
    });
    const [loadingProblems,setLoadingProblems] = useState(true);

    const [problems,setProblems] = useState<DBProblem[]>([]);

    const handleClick = (videoId:string)=>{
        setYoutubePlayer((prev)=>({...prev,isOpen:true, videoId:videoId}));
    }

    const closeModal = ()=>{
        setYoutubePlayer((prev)=>({...prev,isOpen:false, videoId:""}));
    }

    useEffect(()=>{

        const handleEscape =(e:KeyboardEvent)=>{
            if(e.key=="Escape"){
                closeModal()
            }
        }
        window.addEventListener("keydown",handleEscape);

        return () => window.removeEventListener("keydown",handleEscape);
    },[])

    useEffect(()=>{
        const getProblems = async () => {
            console.log("Fetching problems...");
            try {
                setLoadingProblems(true);
                const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
                const querySnapShot = await getDocs(q);
                const tmp: DBProblem[] = [];
                querySnapShot.forEach((doc) => {
                    tmp.push({ id: doc.id, ...doc.data()} as DBProblem);
                });
                setProblems(tmp);
            } catch (error) {
                console.error("Error fetching problems:", error);
            } finally {
                setLoadingProblems(false);
            }
        }
        getProblems();
    },[]);

    return (
        <>
            {loadingProblems ?(
            <>
                {[...Array(10)].map((_,idx)=>{
                return <LoadingSkeleton key={idx}/>
                })}
            </>
            ):(
                <>
                    <tbody className='text-white'>
                        {problems.map((problem:DBProblem,idx:number)=>{
                            const difficultyColor = problem.difficulty ==="Easy"? "text-dark-green-s" : 
                            problem.difficulty === "Medium" ?  "text-dark-yellow": "text-red-700";
                            return (
                                <tr key={problem.id} className={`${idx%2 == 1?"bg-dark-layer-1":""}`}>
                                    <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                        <BsCheckCircle fontSize={"18"} width="18"/>
                                    </th>
                                    <td className='px-6 py-4'>
                                        {problem.link?(
                                            <Link className='hover:text-blue-600 cursor-pointer' href={problem.link} target='_blank'>
                                                {problem.order}.&nbsp;{problem.title}
                                            </Link>
                                        ):(
                                            <Link className='hover:text-blue-600 cursor-pointer' href={`/problems/${problem.id}`}>
                                                {problem.order}.&nbsp;{problem.title}
                                            </Link>
                                        )}
                                    </td>
                                    <td className={`px-6 py-4  ${difficultyColor}`}>
                                        {problem.difficulty}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {problem.category}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {problem.videoId?(
                                            <AiFillYoutube
                                            fontSize={28}
                                            className='cursor-pointer hover:text-red-600'
                                            onClick={()=>{handleClick(problem.videoId as string)}}
                                            />
                                        ):(
                                            <p className='text-gray-400'>Coming Soon</p>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    {youtubePlayer.isOpen && 
                        <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                                <div
                                    className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
                                    onClick={closeModal}
                                ></div>
                                <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                                    <div className='w-full h-full flex items-center justify-center relative'>
                                        <div className='w-full relative'>
                                            <IoClose
                                                fontSize={"35"}
                                                className='cursor-pointer absolute -top-16 right-0 hover:bg-red-500'
                                                onClick={closeModal}
                                            />
                                            <YouTube
                                                videoId={youtubePlayer.videoId}
                                                loading='lazy'
                                                iframeClassName='w-full min-h-[500px]'
                                            />
                                        </div>
                                    </div>
                                </div>
                        </tfoot>
                    }
                </>
            )}
        </>
    )
}
export default ProblemsTable;

const LoadingSkeleton = () =>{
    return (
        <tbody className='text-white'>
            <tr className='w-full h-full'>
                <th className='w-full h-full'>
                    <div className='h-6 w-3/4 rounded-full bg-dark-layer-1 mt-3 mb-3' ></div>
                </th>
                <td className='w-full h-full mt-3 mb-3'>
                    <div className='h-6 w-3/4 rounded-full bg-dark-layer-1'></div>
                </td>
                <td className='w-full h-full mt-3 mb-3'>
                    <div className='h-6 w-3/4 rounded-full bg-dark-layer-1'></div>
                </td>
                <td className='w-full h-full mt-3 mb-3'>
                    <div className='h-6 w-3/4 rounded-full bg-dark-layer-1'></div>
                </td>
                <td className='w-full h-full mt-3 mb-3'>
                    <div className='h-6 w-3/4 rounded-full bg-dark-layer-1'></div>
                </td>
            </tr>
        </tbody>
        //   <div className="flex items-center space-x-12 mt-6 px-6">
    //     <div className="w-10 h-10 shrink-0 rounded-full bg-dark-layer-1"></div>
    //     <div className="h-5 sm:w-52 w-[100px] rounded-full bg-dark-layer-1"></div>
    //     <div className="h-5 sm:w-52 w-[100px] rounded-full bg-dark-layer-1"></div>
    //     <div className="h-5 sm:w-52 w-[100px] rounded-full bg-dark-layer-1"></div>
    //     <span className="sr-only">Loading...</span>
    //   </div>
    );
  }
  