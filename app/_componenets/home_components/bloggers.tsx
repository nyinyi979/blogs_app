'use client'
import Image from "next/image";
import sample from '../../_componenets/img/sample.webp';
import sample2 from '../../_componenets/img/sample2.webp';
import sample3 from '../../_componenets/img/sample3.webp';
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Bloggers(){
  let [ login , setLogin ] = useState(false);
  useEffect(()=>{
    if(localStorage.user) setLogin(true); 
  }, [])
  //Example bloggers in base route , all are styled with tailwind 
    let linkClass = "float-left ml-2 px-3 py-2 btn btn-accent btn-sm";
    let bgImg = "rounded-sm blur-sm z-0 hover:blur-0 duration-300";

    let cards = "card md:w-1/2 w-5/12 bg-gradient-to-br from-primary to-secondary shadow-xl scale-95 border-neutral border-2 text-xs md:text-sm lg:text-lg hover:blur-0 hover:z-20 hover:scale-100 hover:opacity-100 hover:border-primary duration-300";

return(
    <div className="col-span-1 mt-16 h-fit w-full lg:bg-primary">  
        <div className='pt-4 pb-12 h-fit bg-primary rounded-md md:h-32 lg:float-left lg:w-1/2 lg:h-fit lg:pb-32 lg:pl-24 lg:pt-20 border-2 border-secondary hover:border-neutral duration-500'>
            <div className="md:float-left lg:float-none">
                <h1 className='text-xl py-2 pl-2 text-neutral'>Blogging website</h1>
                <div className="container pl-2">
                    <div className="underline_effect typed-out text-lg text-neutral">{login? 'The best website to write blogs!' : 'Create an account to start writing!' }</div>
                </div>
                <p className="lg:block hidden text-neutral w-3/4 text-justify pl-2 leading-10 hover:text-white duration-1000">
                    Create one of the best blogs ever on our Z-Blog.com! There are tons of built-in features to get your blogging process easily done!
                </p>
            </div>
            <div className="pt-3 md:pt-0 md:float-right md:pr-20 lg:mt-10 lg:float-none lg:mx-auto lg:w-full lg:pr-0">
              {/* if the user is logged in , it will tell to start creating or reading blogs! */}
              {login? 
              <>
                <div className="float-left md:ml-4">
                    <p className="text-neutral pb-2 hidden md:block">You are already logged in!</p>
                    <Link className={`${linkClass} md:btn-md md:ml-0`} href={'/home'}>Start reading blogs!</Link>
                </div>
                <div className="float-left md:ml-4">
                    <p className="text-neutral pb-2 hidden md:block">Create post?</p>
                    <Link className={`${linkClass} md:btn-md md:ml-0 `} href={'/upload'}>Yep</Link>
                </div>
              </>
              :
              <>
                <div className="float-left md:ml-4">
                    <p className="text-neutral pb-2 hidden md:block">Already have an account?</p>
                    <Link className={`${linkClass} md:btn-md md:ml-0`} href={'/login'}>Login</Link>
                </div>
                <div className="float-left md:ml-4">
                    <p className="text-neutral pb-2 hidden md:block">New user?</p>
                    <Link className={`${linkClass} md:btn-md md:ml-0 `} href={'/signup'}>Signup</Link>
                </div>
              </>
              }
            </div>      
        </div>
        
        {/* These Profiles are just to show */}
        <div className='mt-2 pb-12 h-fit w-full z-10 rounded-md bg-gradient-to-br from-primary to-secondary lg:float-left lg:bg-none lg:w-1/2'>
          <h1 className='pt-4 w-full text-center text-neutral hover:text-white duration-300' style={{fontSize:'1.5rem'}}>Bloggers</h1>
          <div className="stack items-center md:ml-24 lg:ml-0">

            <div className={`${cards} hover:scale-105 origin-center`}>
              <figure className="border-b-2 h-40 border-primary"><Image src={sample} alt="Shoes" className={bgImg} width={500} height={300}/></figure>
              <Image src={sample} alt="sample" className='rounded-full z-10 border border-primary ml-4' width={100} height={100} style={{marginTop:'-4em'}}/>
              <div className="card-body pl-2 pt-4 text-left ">
                <p className="text-neutral">John Doe</p>
                <p className="text-neutral "><span className='pr-1'>Biography - </span>I am surely very angry!</p>
                <p className='text-neutral'><span>Total blogs -  </span>10</p>
                <p className='text-neutral'><span>Account created - </span>21/9/2023</p>
                <div className="card-actions">
                  <span className="btn btn-xs btn-primary">Computer Science</span>
                  <span className="btn btn-xs btn-primary">Programming</span>
                </div>
              </div>
            </div>

            <div className={`${cards} mr-56 opacity-75 hover:translate-y-2 origin-bottom-left`}>
              <figure className="border-b-2 h-40 border-primary"><Image src={sample2} alt="Shoes" className={bgImg} width={500} height={300}/></figure>
              <Image src={sample2} alt="sample" className='rounded-full z-10 border border-primary ml-4' width={100} height={100} style={{marginTop:'-4em'}}/>
              <div className="card-body pl-2 pt-4 text-left ">
                <p className="text-neutral">James Doe</p>
                <p className="text-neutral"><span className='pr-1'>Biography - </span>What you looking at?</p>
                <p className='text-neutral'><span>Total blogs -  </span>8</p>
                <p className='text-neutral'><span>Account created - </span>7/8/2023</p>
                <div className="card-actions">
                  <span className="btn btn-xs btn-primary">Education</span>
                  <span className="btn btn-xs btn-primary">Language</span>
                </div>
              </div>
            </div>

            <div className={`${cards} ml-56 translate-y-7 opacity-75 blur-sm origin-bottom-right`}>
              <figure className="border-b-2 h-40 border-primary"><Image src={sample3} alt="Shoes" className={bgImg} width={500} height={300}/></figure>
              <Image src={sample3} alt="sample" className='rounded-full z-10 border  border-primary ml-4' width={100} height={100} style={{marginTop:'-4em'}}/>
              <div className="card-body pl-2 text-left">
                <p className="text-neutral">Johnny Doe</p>
                <p className="text-neutral"><span className='pr-1'>Biography - </span>It is very interesting!</p>
                <p className='text-neutral'><span>Total blogs -  </span>6</p>
                <p className='text-neutral'><span>Account created - </span>30/9/2023</p>
                <div className="card-actions">
                  <span className="btn btn-xs btn-primary">Psychology</span>
                  <span className="btn btn-xs btn-primary">Geology</span>
                  <span className="btn btn-xs btn-primary">Religion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
)
}