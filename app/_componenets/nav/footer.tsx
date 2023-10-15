import Link from "next/link"
export default function Footer(){
    return (
    //FOOTER , styled with tailwind ( grid )
    <div className="col-span-1 border-t-2 p-4 mb-3 mt-4 h-60 md:h-52 text-sm border-neutral w-full lg:text-md rounded-md bg-gradient-to-br from-primary to-secondary">
        <div className='py-2 float-left'>
            <div className="py-2 md:float-left md:px-1 lg:px-10 xl:px-20">
                <h1 className="text-neutral underline">About Us</h1>
                <p className='py-1 lg:py-3'><Link href="/about#aboutSite" className='link link-neutral no-underline'>About the website</Link></p>
                <p className='py-1 lg:py-3'><Link href="/about#aboutDev" className='link link-neutral no-underline'>About the developers</Link></p>
                <p className='py-1 lg:py-3'><Link href="/about#FAQs" className='link link-neutral no-underline'>FAQs</Link></p>
            </div>
            <div className="py-2 md:float-left md:px-1 lg:px-10 xl:px-20">
                <h1 className="text-neutral underline">Contact Us</h1>
                <p className='py-1 lg:py-3 text-neutral'>Email - nyinyi095062687@gmail.com</p>
                <p className="py-1 lg:py-3 text-neutral">Phone - 09971110798</p>
            </div>
        </div>
        
        <div className='py-2 float-right md:float-left lg:px-10 xl:px-20'>
            <div className="py-2 md:float-left float-left">
                <h1 className="text-neutral underline">Privacy & Policy</h1>
                <p className="py-1 lg:py-3"><Link href="/about#privacy_policy" className='link link-neutral no-underline'>How we collect your data!</Link></p>
            </div>
            <div className='py-2 md:float-left md:px-1 lg:pl-10 xl:pl-20'>
                <h1 className="text-neutral underline">Getting started?</h1>
                <p className="py-1 lg:py-3"><Link href="/getting_started#blogs" className="link link-neutral no-underline">Blogs</Link></p>
                <p className="py-1 lg:py-3"><Link href="/getting_started#writing" className="link link-neutral no-underline">Writing something</Link></p>
                <p className="py-1 lg:py-3"><Link href="/getting_started#interaction" className="link link-neutral no-underline">Interaction</Link></p>
            </div>
        </div>
    </div>
    )
}