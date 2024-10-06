import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    
    const router = useRouter();
    const setAuthModalstate = useSetRecoilState(authModalState);

    const [inputs,setInputs] = useState({email:" ",password:" "});


    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleInputChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmitForm = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            if(!inputs.email || !inputs.password){
                alert("Please fill all the fields");
            }

            const newUser = await signInWithEmailAndPassword(inputs.email,inputs.password);
            
            if(!newUser){
                throw new Error("Login Failed");
            }

            console.log("USER ",newUser);

            if(newUser) router.push("/");

        } catch (error:any) {
            alert(error.message);
        }
    }

    const handleClick = (type:"register"|"forgotPassword") =>{
        setAuthModalstate((prev) => ({...prev, type: type}))
    }


    return (
        <form className='space-y-6 px-6 py-4' onSubmit={handleSubmitForm}>
            <h3 className='text-xl font-medim text-white'>
                Sign in to LeetCode
            </h3>
            <div>
                <label htmlFor='email' className='text-sm font-medium block text-gray-300'>
                    Your Email
                </label>
                <input onChange={handleInputChange} 
                    type='email' 
                    name='email' 
                    id="email" 
                    className='
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                        block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400
                        text-white
                    ' 
                    placeholder='example@gnail.com'
                />
            </div>
            <div>
                <label htmlFor='password' className='text-sm font-medium block text-gray-300'>
                    Your Password
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
            <button type='submit' className='w-full text-white focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange
            hover:bg-brand-orange'>
                {loading?"Loading...":"Login"}
            </button>
            <button className='fkex w-full justify-end'>
                <a href='#' 
                    className='text-sm block text-brand-orange 
                    hover:underline w-full text-right'
                    onClick={()=>handleClick("forgotPassword")}
                >
                    Forgot Password
                </a>
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Not Registered Yet?{" "}
                <a href="#" className='text-blue-700 hover:underline'
                    onClick={()=>handleClick("register")}
                >
                    Create Account
                </a>
            </div>
        </form>
    )
}
export default Login;