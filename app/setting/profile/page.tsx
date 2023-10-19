"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import { displayMSG } from "../../_componenets/pop_ups";
import { ImCross } from "react-icons/im";
import Link from 'next/link';
type prop = {id: string, name: string, username: string, email: string, phone: string, posts: {categories: {name: string}[]}[], categories_:{name: string}[] , categories: {name: string}[] , _count: {posts: number}, profile:{url: string}}
export default function Setting(){
    //checking user
    useEffect(()=>{
        if(localStorage.user && localStorage.user !=='undefined') return;
        else {
            displayMSG('e', 'You are not authorized');
            setTimeout(()=>{
                window.location.assign('/login');
            } , 3000)
        }
    } , [])
    let [ userID , setUserID ] = useState('');
    let [ loading , setLoading ] = useState(false);
    let [ error , setError ] = useState(false);
    let [ result , setResult ] = useState<prop|undefined>(undefined);
    let [ name_ , setName ] = useState<string>('');
    let [ username , setUsername ] = useState<string>('');
    let [ email , setEmail ] = useState<string>('');
    let [ phone , setPhone ] = useState<string>('');
    //categories uploaded
    let [ categories , setCategories ] = useState<string[]>([]);
    //interested categories to view 
    let [ i_categories , setICategories ] = useState<{name: string}[]>([]);
    //already added categories
    let [ a_categories , setACategories ] = useState<{name: string}[]>([]);
    useEffect(()=>{
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/getUserByID', {id: localStorage.user})
        .then((res)=>{
            
            setResult(res.data);
            setName(res.data.name);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setUserID(res.data.id);
            setICategories(res.data.categories_);
            setACategories(res.data.categories)
            let newArray:string[] = [];
            if(res.data.posts.length !== 0){
                res.data.posts.map((val: {categories: {name: string}[]})=>{
                    val.categories.map((val_: {name:string})=>{
                        newArray.push(val_.name);
                    })
                })
            }
            newArray = [...new Set(newArray)];
            setCategories(newArray);


            setLoading(false);
        })
        .catch((err)=>{
            setError(true);
        })
    }, [userID ])
    return (
        <div className="md:col-span-2 col-span-3 bg-secondary w-full p-3 text-neutral">
        {loading? null : error? "ERROR" : result?   
        <div>
            <table className="table rounded-none table-sm md:table-md">
                <tbody className="bg-secondary">
                <tr className="shadow-md shadow-primary">
                    <td className="border-r-2 border-secondary text-neutral">Name</td>
                    <td><NameBox id={userID} name={name_}/></td>
                </tr>
                <tr className="shadow-md shadow-primary">
                    <td className="border-r-2 border-secondary text-neutral">Username </td>
                    <td><UsernameBox id={userID} username={username}/></td>
                </tr>
                <tr className="shadow-md shadow-primary">
                    <td className="border-r-2 border-secondary text-neutral">Email</td>
                    <td><EmailBox id={userID} email={email}/></td>
                </tr>
                <tr className="shadow-md shadow-primary">
                    <td className="border-r-2 border-secondary text-neutral">Phone number </td>
                    <td><PhoneBox id={userID} phone={phone}/></td>
                </tr>
                <tr className="shadow-md shadow-primary">
                    <td className="border-r-2 border-secondary text-neutral">Categories that you have uploaded</td>
                    <td>
                        {categories.map((val , i)=>{
                            return <button className="btn btn-sm btn-outline btn-neutral ml-1 mt-1" key={i}>{val}</button>
                        })}
                    </td>
                </tr>
                <tr className="shadow-md shadow-primary">
                    <td className="border-r-2 border-secondary text-neutral">Categories that you love to see!</td>
                    <td>
                        <CategoriesBox a_categories={a_categories} i_categories={i_categories} id={userID}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        : null
        }
        </div>
    )
}

//Name edition box
function NameBox(props: {name: string , id:string}){
    //Checking if name is updated or not
    let old_value = props.name;
    let [ name , setName ] = useState(props.name);
    let [ disabled , setDisabled ] = useState(true);
    function updateName(id: string){
        if(name === old_value) {
            setDisabled(true);
            displayMSG('e' , 'Same as the old one :)');
            return;
        }
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/updateName' , {id: props.id , name: name})
        .then((res)=>{
            displayMSG('s' , 'Successfully changed name!');
            setDisabled(true);
            old_value = name;    
})
        .catch(()=>{
            displayMSG('e' , 'Something went wrong!');
            setDisabled(true);
        })
    }
    return (
        <>
            <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="input input-secondary input-sm text-neutral" readOnly={disabled}/> 
            {disabled? 
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(false)}}><BsPencilSquare className="inline"/></span> 
            : 
            <>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{updateName(props.id)}}><TiTickOutline className="inline"/></span>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(true); setName(old_value)}}><ImCross className="inline"/></span>
            </>
            }
        </>
    )
}
//Username edition box
function UsernameBox(props: {username: string , id:string}){
    let old_value = props.username;
    let pattern = /['":;{}()\/\]\[ ]/g;
    let [ username , setUsername ] = useState(props.username);
    let [ disabled , setDisabled ] = useState(true);
    function updateUsername(id: string){
        //Checking if the username changed or not
        if(username === old_value) {
            setDisabled(true);
            displayMSG('e' , 'Same as the old one :)');
            return;
        }
        if(username.match(pattern)){
            document.getElementById('err')!.innerText = `. , { , } , : , ; , ' , " , [ , ] , space must not be in the input box. Use _ instead of space!!`
            return;
        }
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/updateUsername' , {id: props.id , username: username})
        .then((res)=>{
            displayMSG('s' , 'Successfully changed name!');
            setDisabled(true);
            old_value = username;
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong!');
            setDisabled(true);
        })
    }
    return (
        <>
            <input type="text" id="name" value={username} onChange={(e)=>{setUsername(e.target.value)}} className="input input-secondary input-sm text-neutral" readOnly={disabled}/> 
            {disabled? 
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(false)}}><BsPencilSquare className="inline"/></span> 
            : 
            <>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{updateUsername(props.id)}}><TiTickOutline className="inline"/></span>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(true); setUsername(old_value)}}><ImCross className="inline"/></span>
                <span id="err" className="text-sm text-error block"></span>
            </>
            }
        </>
    )
}
function PhoneBox(props: {phone: string , id:string}){
    //Checking if phone is updated or not
    let old_value = props.phone;
    let [ phone , setPhone ] = useState(props.phone);
    let [ disabled , setDisabled ] = useState(true);
    function updatePhone(id: string){
        if(phone === old_value) {
            setDisabled(true);
            displayMSG('e' , 'Same as the old one :)');
            return;
        }
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/updatePhone' , {id: props.id , phone: phone})
        .then((res)=>{
            displayMSG('s' , 'Successfully changed name!');
            setDisabled(true);
            old_value = phone;
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong!');
            setDisabled(true);
        })
    }
    return (
        <>
            <input type="text" id="name" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="input input-secondary input-sm text-neutral" readOnly={disabled}/> 
            {disabled? 
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(false)}}><BsPencilSquare className="inline"/></span> 
            : 
            <>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{updatePhone(props.id)}}><TiTickOutline className="inline"/></span>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(true); setPhone(old_value)}}><ImCross className="inline"/></span>
            </>
            }
        </>
    )
}
function EmailBox(props: {email: string , id:string}){
    let old_value = props.email;
    let [ email , setEmail ] = useState(props.email);
    let [ disabled , setDisabled ] = useState(true);
    function updateEmail(id: string){
        //checking if email is updated or not
        if(email === old_value) {
            setDisabled(true);
            displayMSG('e' , 'Same as the old one :)');
            return;
        }
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/updateEmail' , {id: props.id , email: email})
        .then((res)=>{
            displayMSG('s' , 'Successfully changed name!');
            setDisabled(true);
            old_value = email;
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong!');
            setDisabled(true);
        })
    }
    return (
        <>
            <input type="email" id="name" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input input-secondary input-sm text-neutral" readOnly={disabled}/> 
            {disabled? 
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(false)}}><BsPencilSquare className="inline"/></span> 
            : 
            <>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{updateEmail(props.id)}}><TiTickOutline className="inline"/></span>
                <span className="btn btn-xs mx-1 btn-primary rounded-none" onClick={()=>{setDisabled(true); setEmail(old_value)}}><ImCross className="inline"/></span>
            </>
            }
        </>
    )
}
function CategoriesBox(props: {a_categories:{name: string}[] , i_categories:{name: string}[] , id:string} ){
    let select = useRef<HTMLSelectElement>(null);
    //interested categories to view 
    let [ i_categories , setICategories ] = useState(props.i_categories);
    //already added categories
    let [ a_categories , setACategories ] = useState(props.a_categories);
    function addCat(){
        for(var i =0; i<a_categories.length; i++){
            if(a_categories[i].name === select.current!.value){
                displayMSG('e' , 'It already exists!');
                return;
            }
        }
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/addCategoryToUser', {id: props.id , category: select.current!.value})
        .then(()=>{
            let newArray = [...a_categories , {name: select.current!.value}];
            setACategories(newArray);
            displayMSG('s' , `Category ${select.current!.value} is added to your watchlist!`);
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong');
        })
    }
    function removeCat(){
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/removeCategoryFromUser' , {id: props.id , category: select.current!.value})
        .then(()=>{
            let newArray = a_categories.filter((val)=>{ return val.name !== select.current!.value});
            setACategories(newArray);
            displayMSG('s' , `Category ${select.current!.value} is removed!`);
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong!');
        })
    }
    return(
        <div>
            {a_categories.map((val , i)=>{
                return <button className="btn md:btn-sm btn-xs btn-outline btn-neutral ml-1 mt-1" key={i}>{val.name}</button>
            })}
            <div className="m-1">
                <select ref={select} name="cat" id="cat" className="select select-primary select-sm text-neutral">
                    {i_categories.map((val)=>{
                        return <option value={val.name} key={val.name} disabled={val.name === 'SAMPLE'}>
                            {val.name}
                        </option>
                    })}
                </select>
                <button className="btn btn-primary btn-sm ml-1" onClick={()=>{addCat()}}>Add!</button>
                <button className="btn btn-primary btn-sm ml-1" onClick={()=>{removeCat()}}>Remove!</button>
            </div>
        </div>
    )
}