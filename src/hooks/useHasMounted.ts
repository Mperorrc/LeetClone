"use client"
import { useState, useEffect } from "react";

const useHasMounted = () => {
    const [hasMounted,setHasMounted] = useState(false);

    useEffect(()=>{
        setHasMounted(true);
    },[]);

    return hasMounted;
}

export default useHasMounted;