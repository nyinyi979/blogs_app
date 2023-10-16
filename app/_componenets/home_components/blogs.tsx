import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
export default function Blogs(){

    //Example blogs in base route, all are styled with tailwind
    let cards = "card w-1/2 bg-gradient-to-br from-primary to-secondary shadow-xl border-neutral border-2 text-xs md:text-sm scale-100 hover:opacity-100 hover:scale-105 hover:z-20 duration-300 hover:border-gray-400 hover:blur-0";
    return (
    <div className="col-span-1 pb-8 mt-2 h-fit w-full rounded-md bg-gradient-to-br from-primary to-secondary">
        <h1 className='text-center pb-2 text-neutral hover:text-white duration-300' style={{fontSize:'1.5em'}}>Blogs</h1>
        <div className="stack">
            <div className={`${cards} mx-auto origin-center`}>
                <div className="card-body">
                    <h2 className="card-title text-neutral-focus font-bold">Join millions of others</h2>
                    <p>Whether sharing your expertise, breaking news, or whatever&apos;s on your mind, you&apos;re in good company on Z-Blogs. Sign up to discover what people have published their passions here....</p>
                    <p className='text-neutral'><span>Author-  </span>James</p>
                    <p className='text-neutral'><span>Posted-  </span>31/9/2023</p>
                    <div className="card-actions justify-end">
                        <span className="btn btn-sm btn-primary"><AiOutlineLike /> 15</span>
                        <span className="btn btn-sm btn-primary"><BiCommentDetail /> 20</span>
                    </div>
                </div>
            </div>
            <div className={`${cards} mr-56 translate-y-0 opacity-75 blur-sm hover:translate-y-6 origin-bottom-left`}>
                <div className="card-body">
                    <h2 className="card-title text-neutral-focus font-bold">What is blog?</h2>
                    <p>A blog (a truncation of &ldquo;weblog&rdquo;) is an informational website. Blogs are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page.....</p>
                    <p className='text-neutral'><span>Author-  </span>John</p>
                    <p className='text-neutral'><span>Posted-  </span>8/8/2023</p>
                    <div className="card-actions justify-end">
                        <span className="btn btn-sm btn-primary"><AiOutlineLike /> 35</span>
                        <span className="btn btn-sm btn-primary"><BiCommentDetail /> 10</span>
                    </div>
                </div>
            </div>
            <div className={`${cards} ml-56 -translate-y-6 opacity-75 blur-sm origin-bottom-right`}>
                <div className="card-body">
                    <h2 className="card-title text-neutral-focus font-bold">Start blogging!</h2>
                    <p>Create a beautiful blog that fits your style. Choose from a selection of easy-to-use tools - all with flexible layouts or design & inspire something new......</p>
                    <p className='text-neutral'><span>Author-  </span>Johnny</p>
                    <p className='text-neutral'><span>Posted-  </span>30/9/2023</p>
                    <div className="card-actions justify-end">
                        <span className="btn btn-sm btn-primary"><AiOutlineLike /> 12</span>
                        <span className="btn btn-sm btn-primary"><BiCommentDetail /> 1</span>
                    </div>
                </div>
            </div>
        </div>
            <p className='mt-7 px-5 text-primary-content md:text-center'>Interact with your favourite authors! By giving them <span className="btn btn-sm btn-primary"><AiOutlineLike /></span> Or by commenting( <span className='btn btn-sm btn-primary'><BiCommentDetail /></span> ) on the blog!</p>
    </div>
    )
}