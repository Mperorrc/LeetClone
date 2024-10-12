"use client"
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from '../Timer/Timer';
import { useRouter, usePathname } from 'next/navigation';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';

type TopBarProps = {
    problemPage?:boolean,
};

const TopBar:React.FC<TopBarProps> = ({problemPage}) => {

	const [user,loading] = useAuthState(auth);
	const router = useRouter();
	const pathname = usePathname();

	const setAuthModalState = useSetRecoilState(authModalState);

	const handleProblemChange = async (isForward:boolean) => {
		try {
			const pathArray = pathname.split('/');
			const {order} = problems[pathArray.pop() as string] as Problem;

			let nextProblemOrder = order + (isForward?1:-1);
			if(nextProblemOrder <= 0){
				nextProblemOrder = Object.keys(problems).length;
			}
			else if(nextProblemOrder>=Object.keys(problems).length){
				nextProblemOrder = 1;
			}

			const nextProblemKey = Object.keys(problems).find(key => problems[key].order === nextProblemOrder);

			pathArray.push(nextProblemKey as string);
			const newPathName = pathArray.join('/'); 
			console.log(newPathName);
			router.push(newPathName);

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between ${problemPage? "":"max-w-[1200px] mx-auto"}`}>
				<Link href='/' className='h-[22px] flex-1'>
					<Image src='/logo-full.png' alt='Logo' height={100} width={100} />
				</Link>
				{problemPage && 
					<div className='flex items-center gap-4 flex-1 justify-center'>
						<div className='flex items-center justify-center rounded bg-dark-fill-3
							hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={()=>{handleProblemChange(false)}}
						>
							<FaChevronLeft />
						</div>
						<Link href='/' className='flex items-center gap-2 font-medium max-w-[170px]
							text-dark-gray-8  cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p>Problem List</p>
						</Link>
						<div className='flex items-center justify-center rounded bg-dark-fill-3
							hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={()=>{handleProblemChange(true)}}
						>
							<FaChevronRight />
						</div>
					</div>
				}
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>
						<Link
							href='/premium'
							target='_blank'
							rel='noreferrer'
							className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
						>
							Premium
						</Link>
					</div>
					{problemPage && user && <Timer />}
					{!loading && ( user ? (
						<div className='cursor-pinter group relative'>
							<Image src="/avatar.png" alt="use profile" height={30} width={30}/>
							<div
								className='absolute top-10 left-2/4 -translate-x-2/3 mx-auto
								bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg
								z-40 group-hover:scale-100 scale-0 transition-all duration-300
								ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>

					):(
						<Link
							href='/auth'
							onClick={()=>{
								setAuthModalState((prev)=>({...prev,isOpen:true, type:"login"}));
							}}
						>
							<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
						</Link>
					))}
					{user && <Logout />}
				</div>
			</div>
		</nav>
	);
}
export default TopBar;