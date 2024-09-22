import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AuthContext=createContext()

export const AuthProvider=({children})=>{

    const [token,setToken]=useState(localStorage.getItem('token') || '')
    const [user,setUser]=useState('')

    

    const isLoggedIn=!!token

    const serverToken=async(userToken)=>{
        setToken(userToken)
        localStorage.setItem('token',userToken)
    }

    const authentication=async()=>{
        try {
            const res=await axios.get('http://localhost:3000/api/auth/user',{headers: {
                'Authorization': `Bearer ${token}`
            }})
            
            setUser(res.data.username)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(isLoggedIn){
            authentication()
        }
    },[isLoggedIn])

    const Logout=()=>{
        setToken('')
        setUser('')
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{serverToken,Logout,isLoggedIn,authentication,user}}>
            {children}
        </AuthContext.Provider>
    )
}