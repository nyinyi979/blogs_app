import Link from "next/link"
export default function DefaultPage(){
    return(
        <div className="grid grid-cols-3 w-11/12 mx-auto border-2 border-primary mt-16">
            
            <div className="col-span-1 border-r-2 border-primary bg-secondary">
                <Link href={'/setting/profile'} className="btn btn-neutral w-full btn-outline rounded-none" id="profile">Profile</Link>
                <Link href={'/setting/notification'} className="btn btn-neutral w-full btn-outline rounded-none" id="setting">Notification & Others</Link>
            </div>
            <div className="col-span-2 h-96 bg-secondary w-full p-3 text-neutral">
                <h1 className="font-bold text-lg text-white"> Hello there! </h1>
                You can adjust your settings here. <br />
                There are two types of setting available , see on the left of this text :) <br />
                Just click on them. <br />
            </div>
        </div>
    )
}