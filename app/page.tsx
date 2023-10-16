import { Metadata } from 'next';
import Bloggers from './_componenets/home_components/bloggers';
import Blogs from './_componenets/home_components/blogs';
export const metadata: Metadata = {
  title: "Main" 
}
export default function Home() {
  return (
    <div className='grid grid-cols-1 relative h-fit mx-auto rounded-md' style={{width:'98%'}}>
      <Bloggers />
      <Blogs />
    </div>
  )
}
