"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Text_EditorP from "../../_components/text_editor_profile";
import Img_upload from "@/app/profile/_components/img_upload";

type prop = {author:{name: string}[] , categories:{name: string}[] , content: string , createdAt: string , id: string , images: {url: string , location: string}[] , title:string , comments: { commentedBy: { name: string }[] , content: string }[] , _count: {reactions: number , comments: number} , published: boolean , modifiedAt: string}
function LoadingUI(){
    let sample_img = [1, 2 ,3];
    return(
        <div className="animate-pulse w-10/12 max-h-fit m-5 mx-auto">
            <span className="block w-1/3 h-6 bg-secondary my-4"></span>
            <span className="block w-1/2 h-8 bg-secondary my-4"></span>
            <div className="w-full h-96 bg-secondary"></div>
            <div className="w-full h-56 bg-secondary"></div>
            <span className="block w-1/3 h-6 bg-secondary my-4"></span>
            <span className="block w-1/2 h-6 bg-secondary my-4"></span>
            <div className="w-full">
                <span className="inline-block w-1/6 h-6 bg-secondary my-4"></span>
                <span className="inline-block w-1/6 h-6 ml-1 bg-secondary my-4"></span>
                <span className="inline-block w-1/6 h-6 ml-1 bg-secondary my-4"></span>
            </div>
            <span className="block w-1/3 h-4 bg-secondary my-4"></span>
            <span className="inline-block w-1/6 ml-1 h-6 bg-secondary my-4"></span>
            <span className="inline-block w-1/6 ml-1 h-6 bg-secondary my-4"></span>
            <span className="inline-block w-1/6 ml-1 h-6 bg-secondary my-4"></span>
            <span className="inline-block w-1/6 ml-1 h-6 bg-secondary my-4"></span>
            <span className="btn btn-primary btn-xs px-4 rounded-none ml-1 my-4"></span>
            <div className="w-full grid lg:grid-cols-3 grid-cols-1">
            {sample_img.map((val)=>{
                return (
                    <div key={val} className="mx-1">
                        <span className="block w-1/3 h-4 bg-secondary my-4"></span>
                        <span className="block w-full h-72 bg-secondary my-2"></span>
                        <span className="block w-1/2 h-4 bg-secondary my-4"></span>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
export default function Edit({params}: {params: {id: string}}){
    let [ data , setData ] = useState<prop|undefined>(undefined);
    let [ err , setError ] = useState<string|undefined>(undefined);

    useEffect(()=>{
        //SEND THE USERID HERE TO PREVENT THE ALERNATION OF POSTS BY OTHER USERS
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + `/blog/${params.id}` , {params: {userID: localStorage.user}})
        .then((result)=>{
            setData(result.data);
            console.log(result.data);
        })
        .catch((err)=>{
            setError("Server error occurred");
        })
    }, [params.id])
    return(
        <div className="mt-20">
            {err? <div className="w-full p-56 text-center">{err}</div> : data? <><Text_EditorP category={data.categories} content={data.content} title={data.title} id={params.id} published={data.published} modifiedAt={data.modifiedAt}/><Img_upload images={data.images} id={params.id}/></> : <LoadingUI />}
        </div>
    )
}