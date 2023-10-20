import { useQuery , QueryClientProvider , QueryClient  } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { GetBlogsUI } from '@/app/_componenets/dynamic_components/getBlogs';
import { DeleteModal, displayMSG } from '@/app/_componenets/pop_ups';
import GetThumbnail from '@/app/_componenets/dynamic_components/getImageData';
import { AiFillCheckSquare, AiFillCloseCircle, AiFillSetting } from 'react-icons/ai';
import {BsPencilSquare} from 'react-icons/bs'
import { GiSettingsKnobs } from 'react-icons/gi';
import * as jwt from 'jsonwebtoken'
import Link from 'next/link';
import UserBox from './user_box';
//ONLY FOR PROFILE PAGE
export default function PersonalBlogs(){
    const [queryClient] = useState(() => new QueryClient());
    return(
    <QueryClientProvider client={queryClient}>
        <User/>
    </QueryClientProvider>
    )
}
//data types, array one would be from react query and normal one is just a normal one
type prop = {author:{name: string}[] , categories:{name: string}[] , content: string , createdAt: string , id: string , images: {url: string , location: string}[] , title:string , comments: { commentedBy: { name: string }[] , content: string }[] , _count: {reactions: number , comments: number} , published: boolean , modifiedAt: string}
type props = prop[]
//this is user prop returned from the server, since i didn't want to make a fetch reqest again, i included in /blogsByUserID request
type Uprop = {name: string, username: string, email: string, phone: string, posts: {categories: {name: string}[]}[], _count: {posts: number}, profile:{url: string}}

function User(){
    let [ take , setTake ] = useState(10);
    let [ count , setCount ] = useState(0);
    let { data , isLoading , isError , isFetching } = useQuery<{result: props,user:Uprop}>({
        queryFn: ()=>  axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL +'/blogsByUserID', {params: {id: localStorage.user, t:take , s:0}})
        .then((res)=>{ setCount(res.data.count); return res.data; }) 
        .catch((err)=>{ return new Error("Server error occurred") }),
        queryKey: ["blogsByTime" , take  ] , 
        keepPreviousData: true,
    });
    return(
        <div className="grid grid-cols-2 mt-16">
            {isLoading? <GetBlogsUI /> : null}
            {data? 
            <div className='col-span-2 px-6'>
                <div className="float-left text-neutral text-xl">Blogs</div>
                <div className='float-right'><UserBox prop={data.user}/></div>
            </div>
            : ""}
            {isError? <div className='col-span-2 w-full py-56 text-neutral text-center'>User not found</div> : null}
            {data? 
            data?.result.length === 0? <div className='col-span-2 w-full py-48 text-neutral text-center'>No blogs yet!</div> : 
            data?.result.map((val , i)=>{
                return <GetBlogProfile val={val} key={i}/>
            })
            : null}
            {data? 
            <div className='col-span-2'>
                <button id='loading_div' className='btn btn-secondary btn-sm m-2 w-fit float-right text-right' disabled={take >= count} onClick={()=>{!isFetching? setTake(take+5) : null}}>
                    {take<count? isFetching? <>Loading<span id='loading_bar' className="loading loading-bars loading-sm"></span></> : 'Load more' : 'Nothing more'}
                </button>
            </div>
            :null}
        </div>
    )
}

//GET blogs in profile 
export function GetBlogProfile(props: {val: prop}){
    let parentP_class = "grid grid-cols-2 z-10 md:grid-cols-3 col-span-2 gap-1 p-4 m-2 bg-gradient-to-tr from-primary to-secondary rounded-md lg:text-lg text-md scale-95 border-2 border-neutral-content hover:border-neutral hover:text-white duration-300 cursor-pointer";
    let parentU_class = "grid grid-cols-2 z-10 md:grid-cols-3 col-span-2 gap-1 p-4 m-2 bg-gradient-to-tr from-primary to-neutral-content rounded-md lg:text-lg text-md scale-95 border-2 border-neutral-content hover:border-neutral duration-300 cursor-pointer";
    let img_id = '';
    let [published , setPublished ] = useState<Boolean|null>(props.val.published);

    //PUBLISHING ON PROFILE SCREEN
    function Publish(ID:string){
        let old_val = published;
        setPublished(null);
        if(old_val){
            axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/unPublishBlog' , {params: {id: ID}})
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
            axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/publishBlog', {params: {id: ID}})
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

    //GETTING IMAGE IF THERE IS ONE
    if(props.val.images[0]){
        img_id = props.val.images[0].url.split(".")[0];
        GetThumbnail(props.val.images[0].url , "w480h320" , img_id)
    }
    return(
        <div className={published? parentP_class : parentU_class} id={`blogs_${props.val.id}`}>
            
            <div className="col-span-1 truncate m-2 text-left md:col-span-2 md:ml-5 text-neutral">{props.val.title}</div>
            <div className="col-span-1 text-right text-neutral">Writen by you :) </div>

            <div className="md:col-span-1 row-span-2 col-span-2 md:ml-5">
                <img src="" id={img_id} alt="images" className="h-full w-full rounded-md scale-95 hover:scale-100 mr-2 duration-300 bg-cover"/>
            </div>
            <div className="col-span-2 row-span-2 w-full h-52 max-md:h-32 leading-8 block text-clip overflow-clip text-neutral-focus" dangerouslySetInnerHTML={{__html: props.val.content}}></div>

            <div className="col-span-1 mt-3">
                {props.val.categories.map((value , id)=>{
                    return (
                        <Link href={`/categories/${value.name}`} className="btn btn-secondary ml-2 md:btn-sm btn-xs" key={id}>{value.name}</Link>
                    )
                })}
            </div>
            <div className="col-span-1 mt-3 ml-0 lg:ml-8 md:block hidden text-neutral">
                Last edited : {props.val.modifiedAt===null? '---' : props.val.modifiedAt.split("T")[0]}
            </div>
            <div className="col-span-1 mt-3 btn-group lg:-ml-20 lg:block hidden">
                <button className="btn md:btn-sm btn-xs btn-neutral" onClick={()=>{window.location.assign(`/profile/edit/${props.val.id}`)}}>Edit <BsPencilSquare /></button>
                <button className="btn md:btn-sm btn-xs btn-success" onClick={()=>{published === null? null : Publish(props.val.id)}}>
                    {published===null? <span className="loading loading-spinner"></span> : 
                    published? 'Published' : 'Not published!'}{published? <AiFillCheckSquare /> : <AiFillCloseCircle />}
                </button>
                <DeleteModal id={props.val.id} title={props.val.title} createdAt={props.val.createdAt.split("T")[0]}/>
            </div>

                <details className="dropdown dropdown-top dropdown-end col-span-1 mt-3 lg:hidden block text-right">
                    <summary className='btn btn-primary btn-sm'><GiSettingsKnobs /></summary>
                    <div className="drop-shadow-lg menu dropdown-content z-30 bg-primary w-fit ">
                        <button className="btn md:btn-sm btn-xs btn-neutral rounded-none" onClick={()=>{window.location.assign(`/profile/edit/${props.val.id}`)}}>Edit <BsPencilSquare /></button>
                        <button className="btn md:btn-sm btn-xs btn-info rounded-none py-1" onClick={()=>{published === null? null : Publish(props.val.id)}}>
                            {published===null? <span className="loading loading-spinner"></span> : 
                            published? 'Published' : 'Not published!'}{published? <AiFillCheckSquare /> : <AiFillCloseCircle />}
                        </button>
                    </div>
                </details>
        </div>
    )
}