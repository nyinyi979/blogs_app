'use client'
import Link from "next/link"
import DarkMode from '../darkMode';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState , useEffect } from 'react';
let linkClass = "ml-2 px-3 py-2 btn btn-accent btn-outline btn-sm hover:shadow-md shadow-secondary text-center";
export default function NavBar(){
  let [ login , setLogin ] = useState(false);
  useEffect(()=>{
    if(localStorage.user){
      setLogin(true);
    }
    else setLogin(false);
  }, [])
  //Default navigation bar, styled with tailwind ( grid )
    return (
        <div className="flex flex-row col-span-1 fixed rounded-md bg-secondary h-fit mx-auto my-1 p-2 border-b-1 border-b-primary w-full left-0 -top-1 z-50 bg-opacity-90 shadow-sm shadow-neutral">
        <Drawer/>
        {login? 
        <>
          <div className="flex-initial tooltip tooltip-bottom tooltip-neutral inline-block z-10" data-tip="Create post"> <Link className={linkClass} href={'/upload'}>+</Link></div>
          <div className='flex-initial inline-block'><Link className={linkClass} href={'/home'}>Home</Link></div>
          <div className='flex-initial inline-block'><Link className={linkClass} href={'/profile'}>Profile</Link></div>
        </>
        : 
        <Link className='float-right ml-2 px-3 py-2 mr-4 btn btn-accent btn-sm tooltip' href={'/login'}>Creae an account</Link>
        }
        
      </div>
    )
}
function Drawer(){
  let [ login , setLogin ] = useState(false);
  useEffect(()=>{
    if(localStorage.user){
      setLogin(true);
    }
    else setLogin(false);
  }, [])
  return(
    <div className="drawer inline z-20 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
        <div className="drawer-content tooltip">
        <label htmlFor="my-drawer" className="flex-1 float-left ml-2 px-3 py-2 btn btn-accent btn-outline btn-sm tooltip hover:shadow-md shadow-secondary text-center"><GiHamburgerMenu /></label>
        <div className="flex-1 inline"><Link className={linkClass} href={'/'}>Z-Blog</Link></div>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-neutal bg-secondary mt-1 rounded-md shadow-sm shadow-neutral border-2 border-neutral" style={{height:'99%'}}>
        {/* Sidebar content here */}
        {login? <Link className='btn btn-accent btn-outline btn-sm text-center w-full my-2 hidden md:inline-flex' href={'/setting'}>Setting</Link> : null }
        {login? 
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-accent btn-outline btn-sm text-center w-full my-2 inline-flex md:hidden">Setting</label>
        <ul tabIndex={0} className="dropdown-content z-[1] rounded-box w-fit bg-primary">
          <Link href={'/setting/profile'} className="btn btn-accent btn-sm w-full btn-outline rounded-none" id="profile">Profile</Link>
          <Link href={'/setting/notification'} className="btn btn-accent btn-sm w-full btn-outline rounded-none" id="setting">Notification & Others</Link>
        </ul>
        </div> : null}
          <Link className='btn btn-accent btn-outline btn-sm text-center w-full my-2' href={'/about'}>About us</Link>
          <Link className='btn btn-accent btn-outline btn-sm text-center w-full my-2' href={'/getting_started'}>Getting started?</Link>
          <DarkMode type="b"/>
          {login? <button className="btn btn-error btn-outline btn-sm text-center w-full my-2" onClick={()=>{localStorage.removeItem('user'); window.location.assign('/')}}>Log out</button> : null}
        </ul>
      </div>
    </div>
  )
}