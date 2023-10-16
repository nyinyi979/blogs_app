import '@/app/globals.css'
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next'
export default function Loading(props: {user: any , new_user}){
    useEffect(()=>{
        localStorage.setItem('user' , props.user);
        if(props.new_user === 'true') {
            window.location.assign('/setting/profile');
            return;
        }
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
    let cookies = context.req.cookies;
    return {props: {user : cookies.user , new_user: cookies.new}};
}