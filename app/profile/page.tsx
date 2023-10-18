"use client"
import PersonalBlogs from "./_components/personal_blogs";
import { useEffect } from 'react';
import { displayMSG } from "../_componenets/pop_ups";
export default function Profile(){
    useEffect(()=>{
        if(localStorage.user && localStorage.user !=='undefined') return;
        else {
            displayMSG('e', 'You are not authorized');
            setTimeout(()=>{
                window.location.assign('/login');
            } , 3000)
        }
    } , [])
    return(
        <div>
            <PersonalBlogs/>
        </div>
    )
}