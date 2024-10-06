import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

type LogoutProps = {
    
};

const Logout:React.FC<LogoutProps> = () => {
    
    const [signOut, loading, error] = useSignOut(auth);

    const handleLogout = async()=>{
        try {
            await signOut();
        } catch (error:any) {
            toast.error(error.message, {position:"top-center", autoClose:3000, theme:"dark"});
        }
    }

    return <button 
        className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange'
        onClick={handleLogout}
    >
        <FiLogOut />
    </button>
}
export default Logout;