'use client'
import Link from "next/link"
import DarkMode from '../darkMode';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState , useEffect } from 'react';
let linkClass = "float-left ml-2 px-3 py-2 btn btn-accent btn-outline btn-sm hover:shadow-md shadow-secondary text-center";
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
        <div className="col-span-1 fixed rounded-md bg-secondary h-fit mx-auto my-1 pt-2 border-b-1 border-b-primary w-full left-0 -top-1 z-50 bg-opacity-90 shadow-sm shadow-neutral">
        <Drawer/>
        
        {login? 
        <div className="float-right my-1 mr-2">
          <div className="xl:mr-101 md:mr-36 lg:mr-80 md:inline-block hidden text-center"><Link className={`${linkClass} mx-auto`} href={'/'}>Logo</Link></div>
          <div className="tooltip tooltip-bottom tooltip-neutral z-10" data-tip="Create post"> <Link className={linkClass} href={'/upload'}>+</Link></div>

          <div className='inline-block'><Link className={linkClass} href={'/home'}>Home</Link></div>
          <div className='inline-block'><Link className={linkClass} href={'/profile'}>Profile</Link></div>
        </div>
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
    <div className="drawer inline z-20">
      <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
        <div className="drawer-content tooltip">
        <label htmlFor="my-drawer" className="float-left ml-2 px-3 py-2 btn btn-accent btn-outline btn-sm tooltip hover:shadow-md shadow-secondary text-center"><GiHamburgerMenu /></label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-neutal bg-secondary mt-1 rounded-md shadow-sm shadow-neutral border-2 border-neutral" style={{height:'99%'}}>
        {/* Sidebar content here */}
        {login? <Link className='btn btn-accent btn-outline btn-sm text-center w-full my-2' href={'/setting'}>Setting</Link> : null }
          <Link className='btn btn-accent btn-outline btn-sm text-center w-full my-2' href={'/about'}>About us</Link>
          <Link className='btn btn-accent btn-outline btn-sm text-center w-full my-2' href={'/getting_started'}>Getting started?</Link>
          <DarkMode type="b"/>
          {login? <button className="btn btn-error btn-outline btn-sm text-center w-full my-2" onClick={()=>{localStorage.removeItem('user'); window.location.assign('/')}}>Log out</button> : null}
        </ul>
  </div>
</div>
  )
}