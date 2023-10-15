import '@/app/globals.css'
import { useEffect } from 'react';
export default function Loading(props: {user: any}){
    useEffect(()=>{
        localStorage.setItem('user' , props.user);
        window.location.assign('/home');
    })
    return(
        <div className='w-full h-full text-neutral'>
        <span className="loading loading-spinner loading-md"></span>
        Processing 
        </div>
    )
}
export async function getServerSideProps(context){
    return {props: {user : context.req.cookies.user}};
}