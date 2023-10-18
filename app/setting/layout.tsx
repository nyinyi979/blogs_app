import Link from "next/link"

export default function Setting({
  children,
}: {
  children: React.ReactNode
}){
  return (
    <div className="grid grid-cols-3 w-11/12 mx-auto border-2 border-primary mt-16">
        <div className="col-span-1 border-r-2 border-primary bg-secondary hidden md:block">
            <Link href={'/setting/profile'} className="btn btn-neutral btn-outline w-full rounded-none" id="/setting/profile">Profile</Link>
            <Link href={'/setting/notification'} className="btn btn-neutral w-full btn-outline rounded-none" id="/setting/notification">Notification & Others</Link>
        </div>
        {children}
    </div>
  )
}