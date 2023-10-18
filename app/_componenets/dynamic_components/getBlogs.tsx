import GetThumbnail from "@/app/_componenets/dynamic_components/getImageData";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLike , AiFillCheckSquare, AiFillCloseCircle } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import axios from "axios";
import { DeleteModal_E, displayMSG } from "../pop_ups";
export function GetBlogsUI(){
    let arr: React.JSX.Element[] = [];
    for(var i =0; i<5; i++){
        arr.push(
            <div className="animate-pulse grid grid-cols-3 gap-1 col-span-2 p-4 mx-10 my-4 bg-primary" key={i}>
                <div className="col-span-2 ml-10 w-2/3 h-4 bg-secondary my-2"></div>
                <div className="col-span-1 w-1/2 h-4 my-2 bg-secondary"></div>
                <div className="col-span-1 w-full h-52 max-md:h-32 bg-secondary m-4"></div>
                <div className="col-span-2 w-full h-52 max-md:h-32 m-4">
                    <div className="w-11/12 h-4 bg-secondary my-1 rounded-sm"></div>
                    <div className="w-3/4  h-4 bg-secondary my-2 rounded-sm"></div>
                    <div className="w-11/12  h-4 bg-secondary my-2 rounded-sm"></div>
                    <div className="w-9/12 h-4 bg-secondary my-2 rounded-sm"></div>
                    <div className="w-11/12 h-4 bg-secondary my-2 rounded-sm"></div>
                    <div className="hidden md:block w-4/12 h-4 bg-secondary my-2 rounded-sm"></div>
                    <div className="hidden md:block w-3/4  h-4 bg-secondary my-2 rounded-sm"></div>
                    <div className="hidden md:block w-11/12  h-4 bg-secondary my-2 rounded-sm"></div>
                </div>
                <div className="col-span-1">
                    <div className="inline-flex w-1/3 px-8 h-4 m-2 bg-secondary"></div>
                    <div className="inline-flex w-1/3 px-8 h-4 m-2 bg-secondary"></div>
                </div>
                <div className="col-span-1 w-full">
                    <span className="inline-flex w-1/4 px-12 h-4 m-2 bg-secondary"></span>
                    <span className="inline-flex w-1/4 px-12 h-4 m-2 bg-secondary"></span>
                </div>
                <div className="col-span-1 w-1/2 lg:ml-32 md:ml-16 ml-10 h-4 bg-secondary"></div>
            </div>
        )
    }
    return arr;
}

//GET THE MAIN BLOGS
type prop_ = {author:{username: string}[] , categories:{name: string}[] , content: string , createdAt: string , id: string , images: {url: string , location: string}[] , title:string , comments: { commentedBy: { name: string }[] , content: string }[] , _count: {reactions: number , comments: number}}
export function GetBlog(props:prop_ ){
    if(props === undefined) return;
    let parent_class = "grid grid-cols-2 md:grid-cols-3 col-span-2 gap-1 p-4 m-2 bg-gradient-to-tr from-primary to-secondary rounded-md lg:text-lg text-md scale-95 border-2 hover:border-neutral border-neutral-content duration-300 cursor-pointer";
    let blog_location = `/blogs/${props.id}`;
    let img_id = "";
    if(props.images[0]){
        img_id = props.images[0].url.split(".")[0];
        GetThumbnail(props.images[0].url , "w480h320" , img_id)
    }
    return(
        <div className={parent_class} key={props.id}>
            <div className="col-span-1 truncate m-2 text-left md:col-span-2 md:ml-5 text-neutral">{props.title}</div>
            <div className="col-span-1 text-right text-neutral">Author - <Link href={`/user/${props.author[0].username}`} className="hover:underline duration-300">{props.author[0].username}</Link></div>
            <div className="md:col-span-1 row-span-2 col-span-2 md:ml-5 bg-opacity-50">
                {props.images[0]? <img src="" id={img_id} alt="images" className="h-full w-full rounded-md scale-95 hover:scale-100 mr-2 duration-300 bg-cover"/> : null}
            </div>
            <div className="col-span-2 w-full h-52 max-md:h-32 leading-8 block text-clip overflow-clip text-neutral">
                {props.content.replace(/<\/?[^>]+(>|$)/g, "")} 
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 text-right m-2"><Link href={blog_location} className="btn btn-accent md:btn-sm btn-xs duration-300">Continue reading </Link></div>
            <div className="col-span-1 ml-3">
                <div className="btn md:btn-sm btn-xs md:px-6 mx-2 btn-accent btn-outline"><AiOutlineLike/>{props._count.reactions}</div>
                <div className="btn md:btn-sm btn-xs md:px-6 mx-2 btn-accent btn-outline"><BiCommentDetail/>{props._count.comments}</div>
            </div>
            <div className="col-span-1">
                {props.categories.map((value , id)=>{
                    return (
                        <Link href={`/categories/${value.name}`} className="btn btn-accent btn-outline mx-2 md:btn-sm btn-xs" key={id}>{value.name}</Link>
                    )
                })}
            </div>
            <div className="col-span-2 text-right text-neutral md:col-span-1">Published - <Link href={`/createdAT/${props.createdAt.split('T')[0]}`} className="hover:underline duration-300">{props.createdAt.split('T')[0]}</Link></div>
        </div>
    )
}

//GET THE BLOGS IN GRID STYLE
export function GetGrid(props:prop_ ){
    let parent_class = "grid grid-cols-2 col-span-1 gap-1 p-4 m-2 bg-gradient-to-tr from-primary to-secondary rounded-md lg:text-lg text-md scale-95 border-2 hover:border-neutral border-neutral-content duration-300 cursor-pointer";
    let blog_location = `/blogs/${props.id}`;
    let img_id = "";
    if(props.images[0]){
        img_id = props.images[0].url.split(".")[0];
        GetThumbnail(props.images[0].url , "w480h320" , img_id)
    }
    return(
        <div className={parent_class} key={props.id}>
            <div className="col-span-1 m-2 ml-5 truncate text-left text-neutral">{props.title}</div>
            <div className="col-span-1 text-right text-neutral">Author - <Link href={`/user/${props.author[0].username}`} className="hover:underline duration-300">{props.author[0].username}</Link></div>
            <div className="col-span-2 ml-5 bg-opacity-50">
                {props.images[0]? <img src="" id={img_id} alt="images" className="h-full rounded-sm scale-95 hover:scale-100 mr-2 duration-300 bg-cover"/> : null}
            </div>
            <div className="col-span-2 w-full h-32 leading-8 block text-clip overflow-clip text-neutral p-4">
                {props.content.replace(/<\/?[^>]+(>|$)/g, "")}    
            </div>
            <div className="col-span-1">
                <div className="btn md:btn-sm btn-xs md:px-6 mx-2 btn-accent btn-outline"><AiOutlineLike/>{props._count.reactions}</div>
                <div className="btn md:btn-sm btn-xs md:px-6 mx-2 btn-accent btn-outline"><BiCommentDetail/>{props._count.comments}</div>
            </div>
            <div className="col-span-1 text-right">
                {props.categories.map((value , id)=>{
                    return (
                        <Link href={`/categories/${value.name}`} className="btn md:btn-sm btn-accent btn-outline mx-2 btn-xs" key={id}>{value.name}</Link>
                    )
                })}
            </div>
            <div className="col-span-1 text-left m-2"><Link href={blog_location} className="btn btn-accent md:btn-sm btn-xs duration-300">Continue reading </Link></div>
            <div className="col-span-1 text-right text-neutral">Published - <Link href={`/createdAT/${props.createdAt.split('T')[0]}`} className="hover:underline duration-300">{props.createdAt.split('T')[0]}</Link></div>
        </div>
    )
}


//PUBLISHING , it is used in standalone edition page:) 
//BG color is linked to posts in profile, so it is just for edition page
export function Publish_(props: {ID: string , published: boolean, title: string}){
    let [published , setPublished ] = useState<Boolean|null>(props.published);
    function doStuff(){
        let old_val = published;
        setPublished(null);
        if(old_val){
            axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/unPublishBlog' , {params: {id: props.ID}})
            .then(()=>{
                displayMSG('s', 'Successfully unpublished!');
                setPublished(!old_val);
            })
            .catch(()=>{
                displayMSG('e', 'Something went wrong!');
                setPublished(old_val);
            })
        }
        else {
            axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/publishBlog', {params: {id: props.ID}})
            .then(()=>{
                displayMSG('s' , 'Successfully published!');
                setPublished(!old_val);
            })
            .catch(()=>{
                displayMSG('e' , 'Something went wrong');
                setPublished(old_val);
            })
        }
    }
    return (
        <>
        <button className="btn md:btn-sm btn-xs rounded-none btn-info" onClick={()=>{published === null? null : doStuff()}}>
            {published===null? <span className="loading loading-spinner"></span> : 
            published? 'Published' : 'Not published!'}{published? <AiFillCheckSquare /> : <AiFillCloseCircle />}
        </button>
        <DeleteModal_E id={props.ID} title={props.title} />
        </>
    )
}


