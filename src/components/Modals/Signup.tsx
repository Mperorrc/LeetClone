"use client"
import { authModalState } from '@/atoms/authModalAtom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';


const Signup:React.FC = () => {
    const router = useRouter();
    
    const setAuthModalstate = useSetRecoilState(authModalState);
    const [inputs,setInputs] = useState({email:"", username:"", password:"", resetPassword:""});
    
    const [
        createUserWithEmailAndPassword,
        loading,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleClick = () =>{
        setAuthModalstate((prev) => ({...prev, type: "login"}))
    };

    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    };
    
    const handleRegister = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            toast.loading("Registering User...", {position:"top-center", toastId:"loadingToast" ,autoClose:6000, theme:"dark"});
            if(!inputs.email || !inputs.username || !inputs.password){
                throw new Error("Please fill all the fields");
            }

            if(inputs.password.length<6){
                throw new Error("Password must contain at least 6 characters");
            }

            if(inputs.password!==inputs.resetPassword){
                throw new Error("Passwords dont match");   
            }
            console.log(inputs)
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
            console.log(newUser)
            if(!newUser){
                throw new Error("User Creation Failed!");
            }

            const userData = {
                uid: newUser.user.uid,
                displayName: inputs.username,
                email: newUser.user.email,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems:[],
                dislikedProblems:[],
                starredProblems:[],
                solvedProblems:[]
            }

            await setDoc(doc(firestore,"users",newUser.user.uid), userData);
            
            router.push("/");
        } catch (error:any) {
            toast.error(error.message, {position:"top-center", autoClose:3000, theme:"dark"});
        }
        finally{
            toast.dismiss("loadingToast");
        }
    }

    return (
        <form className='space-y-6 px-6 py-4' onSubmit={handleRegister}>
            <h3 className='text-xl font-medim text-white'>
                Register to LeetCode
            </h3>
            <div>
                <label htmlFor='email' className='text-sm font-medium block text-gray-300'>
                    Email
                </label>
                <input 
                    name='email' 
                    type='email' 
                    id="email" 
                    className='
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                    block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400
                    text-white
                    ' 
                    placeholder='example@gnail.com'
                    onChange={handleInputChange} 
                />
            </div>
            <div>
                <label htmlFor='username' className='text-sm font-medium block text-gray-300'>
                    Username
                </label>
                <input onChange={handleInputChange} type='username' 
                    name='username' 
                    id="username" 
                    className='
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                        block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400
                        text-white
                    ' 
                    placeholder='LeetcodeUser123#'
                />
            </div>
            <div>
                <label htmlFor='password' className='text-sm font-medium block text-gray-300'>
                    Password
                </label>
                <input onChange={handleInputChange} 
                    type='password'
                    name='password' 
                    id="password" 
                    className='
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                        block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400
                        text-white
                    '  
                    placeholder='******'
                />
            </div>
            <div>
                <label htmlFor='resetPassword' className='text-sm font-medium block text-gray-300'>
                    Re-Enter Password
                </label>
                <input onChange={handleInputChange} 
                    type='password'
                    name='resetPassword' 
                    id="resetPassword" 
                    className='
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                        block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400
                        text-white
                    '  
                    placeholder='******'
                />
            </div>
            <button type='submit' className='w-full text-white focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange
            hover:bg-brand-orange'>
                {loading? "Registering...":"Sign Up"}
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Already have an account?{" "}
                <Link href="#" className='text-blue-700 hover:underline' onClick={handleClick}>
                    Sign In
                </Link>
            </div>
        </form>
    )
}
export default Signup;