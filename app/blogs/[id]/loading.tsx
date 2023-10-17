import { GetBottomUI, GetMainUI, GetSideUI } from "./_components/contents&UI";

export default function Loading(){
    return (
        <div className="mt-16 px-4 md:grid md:grid-cols-3 ">
            <div className="col-span-3 md:row-span-6 md:text-3xl row-span-1 bg-secondary-focus text-white py-72 text-xl text-center m-4 scale-95 duration-500">Blog not found</div> : ""}
                <GetMainUI />
            <div className="max-md:carousel max-md:bg-primary w-full rounded-box md:col-span-1 md:row-span-6">
                <GetSideUI />
            </div>
               <GetBottomUI />
        </div>
    )
}