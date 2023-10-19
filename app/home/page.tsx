"use client"
import axios from 'axios';
import { useEffect, useState } from 'react'
import { GetBlogsUI , GetBlog , GetGrid } from '@/app/_componenets/dynamic_components/getBlogs';
import { MdOutlineWindow } from 'react-icons/md';
import { BsSquare } from 'react-icons/bs';
import { useQuery , QueryClientProvider , QueryClient  } from '@tanstack/react-query';
import { displayMSG } from '../_componenets/pop_ups';
import Link from 'next/link';
type prop = {author:{username: string}[] , categories:{name: string}[] , content: string , createdAt: string , id: string , images: {url: string , location: string}[] , title:string , comments: { commentedBy: { name: string }[] , content: string }[] , _count: {reactions: number , comments: number}}[]
//This is also similar to categories/name , the data is fetched according to user selected categories
export default function Blog(){
    useEffect(()=>{
        if(localStorage.user && localStorage.user !=='undefined') return;
        else {
            displayMSG('e', 'You are not authorized');
            setTimeout(()=>{
                window.location.assign('/login');
            } , 3000)
        }
    } , [])
    const [queryClient] = useState(() => new QueryClient());
    return(
    <QueryClientProvider client={queryClient}>
        <Blogs />
    </QueryClientProvider>
    )
}
function Blogs(){
    let [ take , setTake ] = useState(10);
    let [ grid , setGrid ] = useState(false);
    let [ count , setCount ] = useState(0);
    let { data , isLoading , isError , isFetching ,  } = useQuery<prop>({
        queryFn: ()=> axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL +'/blogsByCategories', {params: {id:localStorage.user, t:take , s:0}})
        .then((res)=>{ setCount(res.data.count); return res.data.result;  }) 
        .catch((err)=>{ return new Error("Server error occurred")}),
        queryKey: [take] , 
        keepPreviousData: true,
        retry: 2
    });
    let gridView = data?.map((val, i) => (
        GetGrid(val)
    ));
    let normalView = data?.map((val, i) => (
        GetBlog(val)
    ));
    return(
        <div className="grid grid-cols-2 mt-16">
            {isLoading? <GetBlogsUI /> : null}
            {data? 
            <div className='col-span-2 px-6'>
                <div className="float-left text-neutral text-xl">Blogs</div>
                <div className="float-right btn btn-sm btn-square btn-secondary p-2 tooltip tooltip-left tooltip-primary max-lg:hidden" data-tip="Grid view" onClick={()=>{setGrid(!grid)}}>
                    {grid?  <BsSquare /> : <MdOutlineWindow/>}
                </div>
            </div>
            : ""}
            {isError? <div className='col-span-2 w-full py-56 text-neutral text-center'>Posts not found</div> : null}
            {data? grid?
            gridView
            : 
            normalView
            : ""}
            {data?.length === 0?  <div className='col-span-2 py-52 text-center text-neutral'>No more blogs! You should select mroe categories in your profile setting! <Link href={'/setting/profile'} className='link link-neutral'>Select More!</Link></div> : null}
            {data? 
            <div className='col-span-2'>
                <button id='loading_div' className='btn btn-secondary btn-sm m-2 w-fit float-right text-right' disabled={take >= count} onClick={()=>{!isFetching? setTake(take+5) : null}}>
                    {take<count? isFetching? <>Loading<span id='loading_bar' className="loading loading-bars loading-sm"></span></> : 'Load more' : 'Nothing more'}
                </button>
            </div>
            : 
            null    
            }
        </div>
    )
}