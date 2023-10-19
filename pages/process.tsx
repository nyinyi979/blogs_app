import '@/app/globals.css'
import { useEffect } from 'react';
export default function Loading(props: {user: any , new_user}){
    useEffect(()=>{
        localStorage.setItem('user' , props.user);
        //if it is new user, will redirect to getting_started page
        if(props.new_user === 'true') {
            window.location.assign('/getting_started');
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
//get the cookies
export async function getServerSideProps(context){
    let cookies = context.req.cookies;
    return {props: {user : cookies.user , new_user: cookies.new}};
}