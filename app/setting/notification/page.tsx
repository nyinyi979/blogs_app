"use client"
import DarkMode from '@/app/_componenets/darkMode';
import Link from 'next/link';
import {useEffect} from 'react';
import { displayMSG } from '@/app/_componenets/pop_ups';
export default function Notification(){
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
    <div className="grid grid-cols-3 w-11/12 mx-auto border-2 border-primary mt-16">
        <div className="col-span-1 border-r-2 border-primary bg-secondary">
            <Link href={'/setting/profile'} className="btn btn-neutral btn-outline w-full rounded-none" id="profile">Profile</Link>
            <Link href={'/setting/notification'} className="btn btn-neutral w-full rounded-none" id="setting">Notification & Others</Link>
        </div>
        <div className="col-span-2 bg-secondary ">
            <p className="text-neutral">NONE OF THESE THINGS WORK :)</p>
            <table className='table rounded-none'>
                <thead></thead>
                <tbody>

                    <tr className="shadow-md shadow-primary">
                        <td>
                            <label className="cursor-pointer label block" htmlFor='s1'>
                                <span className="label-text">Send notification from email</span> 
                            </label>
                        </td>
                        <td>
                            <input type="checkbox" className="toggle toggle-accent" id='s1' defaultChecked onChange={()=>{}}/>
                        </td>
                    </tr>

                    <tr className="shadow-md shadow-primary">
                        <td>
                            <label className="cursor-pointer label block" htmlFor='s2' onChange={()=>{}}>
                                <span className="label-text">Send notification about newsletter</span> 
                            </label>
                        </td>
                        <td>
                            <input type="checkbox" className="toggle toggle-accent" id='s2' defaultChecked />
                        </td>
                    </tr>

                    <tr className="shadow-md shadow-primary">
                        <td>
                            <label className="cursor-pointer label block" htmlFor='s3' onChange={()=>{}}>
                                <span className="label-text">Send promotion mails</span> 
                            </label>
                        </td>
                        <td>
                            <input type="checkbox" className="toggle toggle-accent" id='s3' defaultChecked />
                        </td>
                    </tr>

                    <tr className="shadow-md shadow-primary">
                        <td>
                            <label className="cursor-pointer label block" htmlFor='theme'>
                                <span className="label-text">Dark mode</span> 
                            </label>
                        </td>
                        <td>
                            <DarkMode type='i'/>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    )
}
