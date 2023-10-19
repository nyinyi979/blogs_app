'use client'
import Link from "next/link";
import GetThumbnail from "../../../_componenets/dynamic_components/getImageData";
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import {useState , useEffect} from 'react';
import axios from "axios";
import { displayMSG } from "@/app/_componenets/pop_ups";
type prop_ = {author:{username: string}[] , categories:{name: string}[] , content: string , createdAt: string , id: string , images: {url: string , location: string}[] , title:string , comments: { commentedBy: { name: string , username: string }[] , content: string }[] , _count: {reactions: number , comments: number}}
type props = prop_[];
//MIDDLE contents and loading UI
export function GetMainContent(props:prop_){
    return(
        <div className="grid grid-cols-2 md:col-span-2 md:row-span-6 ">
            <div className="col-span-2 text-xl text-center text-neutral">{props.title}</div>
            <div className="col-span-1 px-4 text-neutral text-left">Author - <Link className="link link-neutral hover:underline duration-300" href={`/user/${props.author[0].username}`}>{props.author[0].username}</Link></div>
            <div className="col-span-1 px-4 text-neutral text-right">Posted on - <Link className="link link-neutral hover:underline duration-300" href={`/createdAT/${props.createdAt.split("T")[0]}`}>{props.createdAt.split("T")[0]}</Link></div>
            {props.images.length === 0? <div className="col-span-2 w-11/12 h-fit mx-auto bg-primary"></div> : <div className="col-span-2 w-11/12 h-fit mx-auto"><img src="" className="w-full h-full scale-95 border-4 shadow-md shadow-neutral-content border-primary-content bg-cover col-span-2 hover:border-secondary-focus duration-500 " alt="SAMPLE" width={700} height={1000} id="main_img"/></div>}
            <div className="col-span-2 my-2 p-4 leading-10 text-justify text-primary-content border-2 border-primary-focus indent-10" dangerouslySetInnerHTML={{__html : props.content}}></div>
            <div className="col-span-1">
            {props.categories.map((value , id)=>{
                return (
                    <Link href={`/categories/${value.name}`} className="btn btn-secondary btn-sm m-1" key={id}>{value.name}</Link>
                )
            })}
            </div>
            <div className="col-span-1 px-4 mb-4 text-neutral text-right">Created at : <Link className="link link-neutral hover:underline duration-300" href={`/createdAT/${props.createdAt.split("T")[0]}`}>{props.createdAt.split("T")[0]}</Link> </div>
            <div className="md:hidden text-neutral m-2 hover:text-white duration-500">Swipe left and right!</div>
            <div className="col-span-2">
                <LikeBox _count={props._count} id={props.id} />
                <div className="btn btn-sm px-6 m-2 btn-primary"><BiCommentDetail/>{props._count.comments}</div>
            </div>
            <div className="col-span-2 rounded-sm m-2 p-4 bg-primary">
                {props.comments.map((value , i)=>{
                    return (
                        <div className="rounded-sm border-2 m-1 border-primary scale-95 hover:scale-100 duration-300 bg-gradient-to-tr from-primary to-secondary" key={i}>
                            <div className="bg-secondary p-2"><Link href={`/user/${value.commentedBy[0].username}`}>{value.commentedBy[0].name}</Link></div>
                            <div className="bg-secondary p-2 text-neutral">{value.content}</div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
    
}
let likeID = 0;
function LikeBox(props:{_count: {reactions: number}, id:string }){
    let [ like , setLike ] = useState(false);
    let [ likeCount , setLikeCount ] = useState(props._count.reactions);
    let [ loading , setLoading ] = useState(true);
    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/checkLike' , {params:{postID: props.id , userID: localStorage.user}})
        .then((res)=>{
            if(res.data === 'No') {
                setLike(false);
                setLoading(false);
                return;
            }
            setLike(true);
            likeID = res.data.id;
            setLoading(false);
        })
    } , [props.id])
    function Like(){
        setLoading(true);
        setLikeCount(likeCount + 1);
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/addLike' , {params: {postID: props.id , userID: localStorage.user}})
        .then((res)=>{
            setLike(true);
            likeID = res.data.id;
            displayMSG('s', 'Liked');
        })
        .catch(()=>{
            displayMSG('e' , 'Server error');
        })
        setLoading(false);
    }
    function UnLike(){
        setLoading(true);
        setLikeCount(likeCount - 1);
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/removeLike' , {params: {id: likeID}})
        .then(()=>{
            setLike(false);
            displayMSG('s' , 'Unliked');
        })
        .catch(()=>{
            displayMSG('e', 'Server error');
        })
        setLoading(false);
    }
    return (
        <>
        {loading? <div className="btn btn-sm px-6 m-2 btn-primary"><span className="loading loading-spinner"></span></div> : <><div className={`btn btn-sm px-6 m-2 ${like? 'btn-primary' : 'btn-secondary'}`} onClick={()=>{like? UnLike() : Like()}}>{like? <AiFillLike /> : <AiOutlineLike />}{likeCount}</div></>}
        </>
    )
}
//loading UI For main blog
export function GetMainUI(){
    return(
        <div className="animate-pulse grid grid-cols-2 md:col-span-2 md:row-span-6">
                <h1 className="col-span-2 w-9/12 h-8 mx-auto bg-secondary"></h1>
                <h1 className="col-span-1 my-2 w-1/2 h-8 bg-secondary"></h1>
                <h1 className="col-span-1 my-2 w-1/2 ml-32 h-8 bg-secondary md:ml-32 lg:ml-44 xl:ml-56"></h1>
                <div className="col-span-2 w-11/12 mx-auto">
                    <div className="w-full h-96 bg-secondary rounded-sm"></div>
                    <div className="w-full h-20 bg-secondary rounded-sm"></div>
                </div>
                <div className="col-span-2 w-full my-2 p-4">
                    <div className="w-3/4 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-1/2 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-4/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-3/4 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-1/2 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-4/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-3/4 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-1/2 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="w-4/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-3/4 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-1/2 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-4/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block xl:hidden w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block xl:hidden w-full h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block xl:hidden w-4/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block xl:hidden w-9/12 h-4 bg-secondary my-4 rounded-sm"></div>
                    <div className="hidden md:block xl:hidden w-full h-4 bg-secondary my-4 rounded-sm"></div>
                </div>
                <div className="col-span-2"> 
                    <div className="w-32 float-right ml-2 h-4 bg-secondary rounded-sm"></div>
                    <div className="w-32 float-right ml-2 h-4 bg-secondary rounded-sm"></div>
                </div>
                <div className="md:hidden text-secondary m-2 hover:text-white duration-500">Swipe left and right!</div>
                
            </div>
    )
}

//Sidebar contents and loading UI 
export function GetSideContent(props:props){
    let arr: React.JSX.Element[] = [];
    for(var i = 0; i<props.length; i++){
        let img_id = 'img' + i;
        let carousel_item = "carousel-item w-full cursor-pointer rounded-sm mx-auto md:mt-0 max-md:mx-3 max-md:pt-2 max-md:hover:bg-secondary md:p-2 hover:bg-primary duration-300";
        if(i>6){
            carousel_item = "carousel-item w-full cursor-pointer rounded-sm mx-auto md:mt-0 max-md:mx-3 max-md:pt-2 max-md:hover:bg-secondary md:p-2 md:hidden hover:bg-primary duration-300";
        }
        let location = `/blogs/${props[i].id}`;
        arr.push (
            <div className={carousel_item} key={i}>
                <div className="grid grid-cols-3 gap-1 p-2">
                    <h1 className="col-span-2 text-sm w-11/12 text-neutral truncate text-left hover:text-neutral duration-300">{props[i].title}</h1>
                    <div className="col-span-1 text-sm text-right text-neutral ">Author - <Link href={`/user/${props[i].author[0].username}`} className="hover:underline duration-300">{props[i].author[0].username}</Link></div>
                    <div className="col-span-1 h-36 bg-cover rounded-sm bg-primary p-1 mt-3 hover:p-0 duration-300">
                        <img src="" alt="images" id={img_id} className="w-full h-full bg-cover"/>
                    </div>
                    <div className="col-span-2 h-36 block text-clip overflow-clip text-neutral p-2">
                        {props[i].content}
                    </div>
                    <div className="col-span-3"> 
                        {props[i].categories.map((value , id)=>{
                            return (
                                <Link href={`/categories/${value.name}`} className="btn btn-secondary btn-xs m-1" key={id}>{value.name}</Link>
                            )
                        })}
                        {/* <span className="btn btn-secondary btn-xs m-1">Category</span>
                        <span className="btn btn-secondary btn-xs m-1">Category</span> */}
                        <Link href={location} className="float-right col-span-1 btn btn-secondary btn-xs m-1">Continue reading!</Link>
                    </div>
                    
                </div>
            </div>
        )
        GetThumbnail(props[i].images[0].url , "w256h256",img_id)
    }
    return arr;
}
//Side blogs loading UI
export function GetSideUI(){
    let arr: React.JSX.Element[] = [];
    for(var i = 0; i<6; i++){
        let carousel_item = "animate-pulse carousel-item w-full mt-2 max-md:mx-3 md:p-4";
        arr.push (
            <div className={carousel_item} key={i}>
                <div className="grid grid-cols-3 w-full gap-1 p-2">
                    <h1 className="col-span-2 w-1/2 h-4 rounded-md bg-secondary md:w-3/4 "></h1>
                    <h2 className="col-span-1 w-2/3 h-4 rounded-md bg-secondary ml-14 md:ml-0 md:w-full"></h2>
                    <div className="col-span-1 h-36 rounded-md bg-secondary p-3 mt-3"> </div>
                    <div className="col-span-2 h-36 p-2"> 
                        <div className="w-full h-4 rounded-md bg-secondary m-2"></div>
                        <div className="w-1/2 h-4 rounded-md ml-52 bg-secondary m-2 md:ml-24 lg:ml-36"></div>
                        <div className="w-full h-4 rounded-md bg-secondary m-2"></div>
                        <div className="w-1/2 h-4 rounded-md bg-secondary m-2 md:ml-20"></div>
                        <div className="w-full h-4 rounded-md bg-secondary m-2"></div>
                    </div>
                    <div className="col-span-2 w-full"> 
                        <span className="btn btn-secondary btn-xs mr-3 w-1/3 h-4"></span>
                        <span className="btn btn-secondary btn-xs mr-3 w-1/3 h-4"></span>
                    </div>
                    <span className="col-span-1 bg-secondary w-full h-6 rounded-sm"></span>
                </div>
            </div>
        )
    }
    return arr;
}

//Bottom bar ( only in medium and small screen ) contents and loading UI
export function GetBottomContents(props: props){
    let arr: React.JSX.Element[] = [];
    for(var i = props.length-3; i<props.length; i++){
        let location = `/blogs/${props[i].id}`
        let img_id = i + 'img';
        arr.push(
            <div className="hidden col-span-1 row-span-1 w-full p-4 mt-2 cursor-pointer rounded-sm mx-auto md:block md:mt-0 hover:bg-primary duration-300"  key={i}>
                <div className="grid grid-cols-3 gap-1 p-2">
                    <h1 className="col-span-2 text-sm w-11/12 text-neutral truncate text-left hover:text-white duration-300">{props[i].title}</h1>
                    <div className="col-span-1 text-sm text-right text-neutral ">Author - <Link href={`/user/${props[i].author[0].username}`} className="hover:underline duration-300">{props[i].author[0].username}</Link></div>
                    <div className="col-span-1 h-36 bg-cover rounded-sm bg-primary p-1 mt-3 hover:p-0 duration-300">
                        <img src="" alt="images" id={img_id} className="w-full h-full bg-cover"/>
                    </div>
                    <div className="col-span-2 h-36 block text-clip overflow-clip text-neutral p-2">
                        {props[i].content}
                    </div>
                    <div className="col-span-3"> 
                        {props[i].categories.map((value , id)=>{
                            return (
                                <Link href={`/categories/${value.name}`} className="btn btn-secondary btn-xs m-1" key={id}>{value.name}</Link>
                            )
                        })}
                        {/* <span className="btn btn-secondary btn-xs m-1">Category</span>
                        <span className="btn btn-secondary btn-xs m-1">Category</span> */}
                        <Link href={location} className="float-right col-span-1 btn btn-secondary btn-xs m-1">Continue reading!</Link>
                    </div>
                </div>
            </div>
        )
        GetThumbnail(props[i].images[0].url , "w256h256",img_id)
    }
    return arr;
}
export function GetBottomUI(){
    let arr: React.JSX.Element[] = [];
    for(var i = 0; i<3; i++){
        arr.push(
            <div className="md:block hidden col-span-1 row-span-1 mt-2 p-4" key={i}>
                <div className="grid grid-cols-3 w-full gap-1 p-2">
                    <h1 className="col-span-2 rounded-md text-left w-3/4 h-4 bg-secondary"></h1>
                    <h2 className="col-span-1 rounded-md float-left mr-2 text-neutral w-full h-4 bg-secondary"></h2>
                    <div className="col-span-1 rounded-md h-36 bg-secondary p-3 mt-3"> </div>
                    <div className="col-span-2 h-36 p-2"> 
                        <div className="w-full h-4 rounded-md bg-secondary m-2"></div>
                        <div className="w-1/2 h-4 rounded-md bg-secondary m-2 md:ml-24 lg:ml-36"></div>
                        <div className="w-full h-4 rounded-md bg-secondary m-2"></div>
                        <div className="w-1/2 h-4 rounded-md bg-secondary m-2 md:ml-20"></div>
                        <div className="w-full h-4 rounded-md bg-secondary m-2"></div>
                    </div>
                    <div className="col-span-2 w-full"> 
                        <span className="btn btn-secondary btn-xs mr-3 w-1/3 h-4"></span>
                        <span className="btn btn-secondary btn-xs mr-3 w-1/3 h-4"></span>
                    </div>
                    <span className="col-span-1 text-neutral bg-secondary text-right w-full h-6 rounded-sm hover:bg-primary"></span>
                </div>
            </div>
            )
    }
    return arr;
}