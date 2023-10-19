"use client";
import { useState , useEffect } from 'react';
import { GetSideContent,GetBottomContents,GetBottomUI,GetSideUI, GetMainContent, GetMainUI } from "./_components/contents&UI";
import axios from "axios";
import GetThumbnail from "../../_componenets/dynamic_components/getImageData";
let main_result: React.JSX.Element;
let side_result: React.JSX.Element[] = [];
let bottom_result: React.JSX.Element[] = [];
//Note that login isn't check here, to allow user to read a certain blog without actually creating an account
export  default function HomePage({params}: {params: {id: string}}){
    const [ blogs , setBlogs ] = useState<Boolean>(false);
    const [ main , setMain ] = useState<Boolean>(false);
    let [ error , setError ] = useState(false);
    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + `/blog/${params.id}`).then((res)=>{
            main_result = GetMainContent(res.data);
            GetThumbnail(res.data.images[0].url , "w1024h768" , "main_img");
            setMain(true);
        }).catch(()=>{
            setError(true);
        })
        //There is exactly 11 blogs to be shown beside the main blog
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/blogsByCategories',{params: {id: localStorage.user ,'t':11,'s':0}}).then((res)=>{
            let main_blog_removed = res.data.result.filter((item) => item.id !== params.id);
            side_result = GetSideContent(main_blog_removed );
            bottom_result = GetBottomContents(main_blog_removed);
            setBlogs(true)
        });
    }, [params.id])
    
    return (
        <div className="mt-16 px-4 md:grid md:grid-cols-3 ">
            {error? <div className="col-span-3 md:row-span-6 md:text-3xl row-span-1 bg-secondary-focus text-white py-72 text-xl text-center m-4 scale-95 duration-500">Blog not found</div> : ""}
                {main? main_result : error? "" : <GetMainUI />}
            <div className="max-md:carousel max-md:bg-primary w-full rounded-box md:col-span-1 md:row-span-6">
                {error? null : blogs? side_result : <GetSideUI />}
            </div>
                {error? null : blogs? bottom_result : <GetBottomUI />}
        </div>
    )
}