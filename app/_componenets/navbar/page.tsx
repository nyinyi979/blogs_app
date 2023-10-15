import {AiOutlineUser,AiOutlineHeart,AiOutlineArrowRight,AiOutlineSearch,AiOutlineDown , AiOutlineMenu} from 'react-icons/ai';
import {BsBag} from 'react-icons/bs';
import {BiPhoneCall} from 'react-icons/bi';
import img from '../_componenets/img/sample.webp'
import Image from 'next/image';
export default function NavBar(){
    return (
        <>
        <div className="grid grid-cols-12 bg-black w-full py-4 h-fit gap-4">
            <div className='lg:col-span-4 lg:block hidden text-center text-xs'>The #1 Online Tech Retailer in Myanmar »<a className="link link-neutral no-underline"> Reviews <AiOutlineArrowRight className="inline"/></a></div>
            <div className='lg:col-span-4 lg:block hidden text-center text-xs'><a className="link link-neutral no-underline"> Like us on Facebook </a></div>
            <div className='lg:col-span-4 col-span-12 text-center text-xs'><BiPhoneCall className="inline"/> Make a call and negotiate although prices are changeable</div>
        </div>

        <div className="grid grid-cols-12 bg-white w-full lg:px-8 md:px-20 px-16 py-2 gap-4">
            <div className='col-span-3 lg:block hidden ml-10'><Image src={img} width={100} height={100} alt='ICT' className='rounded-md'/></div>

            <div className='col-span-4 lg:block hidden m-0 pt-6 text-center'>
                <input type="text" name="search" id="searchBar" className='py-2 px-4 border-2 border-gray-200 rounded-md text-black' size={55} placeholder='Search by Product title, Brand, Category, Model no. or SKU...' />
            </div>


            <div className="col-span-1 pt-2 drawer lg:hidden" style={{zIndex:'3'}}>
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="drawer-button"><AiOutlineMenu className="inline text-black text-2xl cursor-pointer hover:text-red-600 duration-300"/></label>
                </div> 
                <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                  </div>
            </div>
            
            <div className="col-span-1 pt-2 drawer drawer-end lg:hidden" style={{zIndex:'3'}}>
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label htmlFor="my-drawer-4" className="drawer-button"><AiOutlineSearch className="inline text-black text-2xl cursor-pointer hover:text-red-600 duration-300"/></label>
                </div> 
                <div className="drawer-side">
                  <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <input type="text" name="search" id="searchBar" className='py-2 px-4 border-2 border-gray-200 rounded-md text-black' size={20} placeholder='Search by Product title...' />
                    <button className='btn btn-primary my-3'>Search</button>
                  </ul>
                </div>
            </div>

            <div className='col-span-6 lg:hidden block m-0 mx-auto'><Image src={img} width={50} height={50} alt='ICT' className='rounded-md'/></div>

            <div className='col-span-4 lg:pt-6 pt-2 text-right'>
                <div className='inline px-2'><AiOutlineUser className="inline text-black hover:text-red-600 duration-300 text-xl" /></div>
                <div className=' md:inline px-2 hidden relative'><AiOutlineHeart className="inline text-black hover:text-red-600 duration-300 text-xl" /><p className="absolute top-0 right-0 badge badge-xs badge-warning">0</p></div>
                <div className='inline px-2 relative' style={{zIndex:'1'}}><BsBag className="inline text-black hover:text-red-600 duration-300 text-lg" /><span className="absolute top-0 right-0 badge badge-xs badge-warning">0</span></div>
            </div>

        </div>
        <div className="lg:grid grid-cols-12 bg-black w-full py-4 pr-6 gap-4 hidden">
            <div className="col-span-9">
                <div className='dropdown dropdown-hover pl-8'>
                    <label tabIndex={0} className="m-1 link link-neutral no-underline">Products <AiOutlineDown className="inline text-neutral text-sm"/></label>
                    <table tabIndex={0} className='dropdown-content z-10 shadow-md menu table scroll table-sm space-x-2 h-full overflow-visible overflow-y-scroll bg-base-100'>
                        <thead>
                            <tr className='border-none'>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Apple, iPhone, iPads and Macs</a></th>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Laptop/Notebooks</a></th>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Desktp PC & Components</a></th>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Mobile Phones</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='dropdown dropdown-hover px-3'>
                    <label tabIndex={0} className="m-1 link link-neutral no-underline">Deals <AiOutlineDown className="inline text-neutral text-sm"/></label>
                    <table tabIndex={0} className='dropdown-content z-10 shadow-md menu table scroll table-sm space-x-2 h-full overflow-visible overflow-y-scroll bg-base-100'>
                        <thead>
                            <tr className='border-none'>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Apple, iPhone, iPads and Macs</a></th>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Laptop/Notebooks</a></th>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Desktp PC & Components</a></th>
                                <th><a className='btn btn-secondary bg-base-100 border-none'>Mobile Phones</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                            <tr className='border-none'>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPhone</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>iPad</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Pro</a></td>
                                <td><a className='btn btn-secondary bg-base-100 border-none hover:text-red-600'>Macbook Air</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='inline px-4 link link-neutral no-underline'>Game Center </div>
                <div className='inline px-4 link link-neutral no-underline'>Click & Collect </div>
                <div className='inline px-4 link link-neutral no-underline'>Rewards </div>
                <div className='inline px-4 link link-neutral no-underline'>Get a Quote</div>
                <div className='inline px-4 link link-neutral no-underline'>Buy Now Pay Later </div>
            </div>
            <div className='col-span-1'></div>
            <div className='col-span-2 text-right'><BiPhoneCall className="inline text-neutral" />0976 554 1708</div>
        </div>
        </>
    )
}