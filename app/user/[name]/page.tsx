"use client"
import axios from 'axios';
import { useState } from 'react'
import { GetBlogsUI , GetBlog , GetGrid } from '@/app/_componenets/dynamic_components/getBlogs';
import { MdOutlineWindow } from 'react-icons/md';
import { BsSquare } from 'react-icons/bs';
import { useQuery , QueryClientProvider , QueryClient  } from '@tanstack/react-query';
type prop = {author:{username: string}[] , categories:{name: string}[] , content: string , createdAt: string , id: string , images: {url: string , location: string}[] , title:string , comments: { commentedBy: { name: string }[] , content: string }[] , _count: {reactions: number , comments: number}}[]

export default function Blog({params}: {params: {name: string}}){
    const [queryClient] = useState(() => new QueryClient());
    console.log(params.name);
    return(
    <QueryClientProvider client={queryClient}>
        <User user={decodeURIComponent(params.name)}/>
    </QueryClientProvider>
    )
}

function User(props: {user:string}){
    let [ take , setTake ] = useState(10);
    let [ grid , setGrid ] = useState(false);
    let [ count , setCount ] = useState(0);
    let { data , isLoading , isError , isFetching } = useQuery<prop>({
        queryFn: ()=> axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL +'/blogsByUser', {params: {user:props.user, t:take , s:0}})
        .then((res)=>{ setCount(res.data.count); return res.data.result; }) 
        .catch((err)=>{ return new Error("Server error occurred") }),
        queryKey: ["blogsByTime" , take] , 
        keepPreviousData: true
    });
    let gridView = data?.map((val) => (
        GetGrid(val)
    ));
    let normalView = data?.map((val) => (
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
            {isError? <div className='col-span-2 w-full py-56 text-neutral text-center'>User not found</div> : null}
            {data? grid?
            gridView?.length === 0? <div className='col-span-2 w-full py-48 text-neutral text-center'>There is nothing to see here!</div> : gridView
            : 
            normalView?.length === 0? <div className='col-span-2 w-full py-48 text-neutral text-center'>There is nothing to see here!</div> : normalView
            : null}
            {data? 
            <div className='col-span-2'>
                <button id='loading_div' className='btn btn-secondary btn-sm m-2 w-fit float-right text-right' disabled={take >= count} onClick={()=>{!isFetching? setTake(take+5) : null}}>
                    {take<count? isFetching? <>Loading<span id='loading_bar' className="loading loading-bars loading-sm"></span></> : <button className='w-full h-full'>Load more</button> : <button className='disabled'>Nothing more:)</button>}
                </button>
            </div>
            :null}
        </div>
    )
}