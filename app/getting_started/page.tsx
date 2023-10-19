'use client'
import Image from "next/image";
import Link from "next/link";
import setting_l from '@/app/_componenets/img/setting_l.png';
import setting_d from '@/app/_componenets/img/setting_d.png';
import blog_l from '@/app/_componenets/img/blog_l.png';
import blog_d from '@/app/_componenets/img/blog_d.png';
import profile_l from '@/app/_componenets/img/setting_l.png';
import profile_d from '@/app/_componenets/img/setting_d.png';
import upload_l1 from '@/app/_componenets/img/upload_l.png';
import upload_l2 from '@/app/_componenets/img/upload_l1.png';
import upload_d1 from '@/app/_componenets/img/upload_d.png';
import upload_d2 from '@/app/_componenets/img/upload_d1.png';
import edit_l1 from '@/app/_componenets/img/edit_l1.png';
import edit_l2 from '@/app/_componenets/img/edit_l2.png';
import edit_l3 from '@/app/_componenets/img/edit_l3.png';
import edit_d1 from '@/app/_componenets/img/edit_d1.png';
import edit_d2 from '@/app/_componenets/img/edit_d2.png';
import edit_d3 from '@/app/_componenets/img/edit_d3.png';
import {useState , useEffect} from 'react';

//First time theme check will happen and will change the image background, 
//NOTE: THE IMAGES WON'T CHANGE IF THE DARKMODE IS TOGGLED
export default function GettingStarted(){
    let [ dark , setDark ] = useState(true);
    useEffect(()=>{
        const themeCheck = () => {
            if (localStorage.darkMode === "dark") {
              setDark(true);
            } else {
              setDark(false);
            }
          } 
        themeCheck();
    } , [dark])
    //New user page to get started in Z-Blog wooooooooooo
    return(
        <div className="scroll-smooth text-neutral bg-secondary md:text-lg mt-16 w-11/12 rounded-md mx-auto leading-8 border-2 border-neutral-focus">
            <div className="w-2/3 mx-auto p-2">
                
                Name , username , email( gmail ) , ph<h1 className="font-bold">User info!</h1>one number can be edited from <Link className="link link-neutral hover:underline" href={'/setting/profile'}>Setting &gt; Profile</Link> 
                 page. <br /> ( The setting page is accessible via side menu ). <br />
                You can see the example here: 
                <div className="mx-auto w-fit my-2">
                    {dark? 
                    <Image src={setting_d} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    :
                    <Image src={setting_l} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                </div>
                <span id="writing" className="mt-4"></span>
            </div>
            <div className="w-2/3 mx-auto p-2">
                <h1 className="font-bold">Creating posts!</h1>
                Each user can create blog by clicking on + sign in the navigation bar!
                First of all, you will have to fill in the title, content and categories (Make sure to follow rules when filling categories)!
                <div className="mx-auto w-fit my-2">
                    {dark? 
                    <Image src={upload_d1} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    :
                    <Image src={upload_l1} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                    {dark? 
                    <Image src={upload_d2} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    :
                    <Image src={upload_l2} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                </div>
                After that you will see your post ( unpublished yet ) in your <Link className="link link-neutral hover:underline" href={'/profile'}>Profile</Link> page!
                Click on &apos;Edit&apos; button to start editing your post ( Add images , add more categories , add more contents ).
                <div className="mx-auto w-fit my-2">
                    {dark? 
                        <Image src={edit_d1} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                        :
                        <Image src={edit_l1} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                    {dark? 
                        <Image src={edit_d2} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                        :
                        <Image src={edit_l2} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                    {dark? 
                        <Image src={edit_d3} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                        :
                        <Image src={edit_l3} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                </div>
                Don&apos;t forget to click &apos;Save&apos;. Also, click Publish after you have fully edited your post!
                
                <span id="blogs" className="mt-4"></span>
            </div>
            <div className="w-2/3 mx-auto p-2">
                <h1 className="font-bold">Blogs!</h1>
                You can see the blogs in your home page! If the blogs are too low, it might be that you are not putting enough category that you want to watch!
                <div className="mx-auto w-fit my-2">
                    {dark? 
                    <Image src={profile_d} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    : 
                    <Image src={profile_l} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                </div>
                Update them in your <Link className="link link-neutral hover:underline" href={'/setting/profile'}>Profile setting</Link> page!
                <span id="interaction" className="mt-4"></span>
            </div>
            <div className="w-2/3 mx-auto p-2">
                <h1 className="font-bold">Interaction with blogs</h1>
                You can see like and comment button in all of the blogs. You need to enter specific <span className="font-bold">blogs/blog_1231413 </span> page to give likes and comments. 
                The one in the main pages are just to show how many of the likes and comments the posts have received.
                <div className="mx-auto w-fit my-2">
                    {dark? 
                    <Image src={blog_d} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    : 
                    <Image src={blog_l} alt="sample_image" width={500} height={500} className="w-fit bg-cover hover:scale-105 duration-300"/>
                    }
                </div> 
            </div>
        </div>
    )
}