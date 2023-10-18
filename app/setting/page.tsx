import Link from "next/link"
export default function DefaultPage(){
    return(
        <div className="md:col-span-2 col-span-3 h-96 bg-secondary w-full p-3 text-neutral">
            <h1 className="font-bold text-lg text-white"> Hello there! </h1>
            You can adjust your settings here. <br />
            There are two types of setting available , see on the left of this text :) <br />
            Just click on them. <br />
        </div>
    )
}