import { displayMSG } from "@/app/_componenets/pop_ups";
import axios from "axios";
import Link from "next/link";
import { useState } from "react"
import { BsGoogle } from "react-icons/bs";


export function Login(){
    let [ gmail , setGmail ] = useState('');
    let [ code , setCode ] = useState('');
    let [ code_ , setCode_ ] = useState('');
    function fetchCode(){
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/getCode')
        .then((res)=>{
            setCode(res.data.code);
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong');
        })
    }
    function checkCode(){
        if(code_ !== code) {
            displayMSG('e', 'The code is not correct')
        }
        else {
            axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/checkUser' , {mail: gmail})
            .then((res)=>{
                console.log(res);
                if(res.data.newUser){
                    localStorage.setItem('user' , res.data.id);
                    window.location.assign('/getting_started');
                }
                else {
                    localStorage.setItem('user' , res.data.id);
                    window.location.assign('/home');
                }
            })
            .catch((err)=>{
                displayMSG('e' , 'Server error');
            })
        }
    }
    return(
        <div>
            {code===''? 
            <>
                <span className="text-neutral my-2 block">Login: Enter your gmail!</span>
                <input type="email" className="input input-secondary input-md text-neutral" placeholder="someone@gmail.com" name="gmail" id="gmail" value={gmail} size={30} onChange={(e)=>{setGmail(e.target.value)}}/> <br />
                <button className="btn btn-sm btn-accent my-2" onClick={fetchCode}>Send a code!</button> <br />
                {gmail===''? 
                <Link className="btn btn-error btn-outline btn-sm" href={'/api/google'}>
                    Continue with Google <BsGoogle className="inline"/>
                </Link> : null
                }
            </> 
            :
            <>
                <input type="text" className="input input-secondary text-white font-bold text-lg bg-gradient-to-tr from-secondary to-neutral my-2 overflow-hidden caret-transparent focus:to-primary duration-300" style={{backgroundSize: '50px 1px', letterSpacing: '40px',outline:'none', width:'300px'}} maxLength={5} value={code_} onChange={(e)=>{setCode_(e.target.value)}}/> <br />
                <button className="btn btn-sm btn-accent" onClick={checkCode}>Login</button>
            </>
            }
        </div>
    )
}


export function Signup(){
    let [ gmail , setGmail ] = useState('');
    let [ code , setCode ] = useState('');
    let [ code_ , setCode_ ] = useState('');
    function fetchCode(){
        axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/getCode')
        .then((res)=>{
            setCode(res.data.code);
        })
        .catch(()=>{
            displayMSG("e","SOMETHING WENT WRONG");
        })
    }
    function checkCode(){
        if(code_ !== code) {
            displayMSG('e', 'The code is not correct')
        }
        else {
            axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/checkUser' , {mail: gmail})
            .then((res)=>{
                console.log(res);
                if(res.data.newUser){
                    localStorage.setItem('user' , res.data.id);
                    window.location.assign('/getting_started');
                }
                else {
                    localStorage.setItem('user' , res.data.id);
                    window.location.assign('/home');
                }
            })
            .catch((err)=>{
                displayMSG('e' , 'Server error');
            })
        }
    }
    return(
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {code===''? 
            <>
                <span className="text-neutral my-2 block">Sign up: Enter your gmail!</span>
                <input type="email" className="input input-secondary input-md text-neutral" placeholder="someone@gmail.com" name="gmail" id="gmail" value={gmail} size={30} onChange={(e)=>{setGmail(e.target.value)}}/> <br />
                <button className="btn btn-sm btn-accent" type="submit" onClick={fetchCode}>Sign up!</button> <br />
            </> 
            :
            <>
                <span className="text-neutral my-2 block">We have sent you a code to the gmail! </span>
                <input type="text" className="input input-secondary text-white font-bold text-lg bg-gradient-to-tr from-secondary to-neutral my-2 overflow-hidden caret-transparent focus:to-primary duration-300" style={{backgroundSize: '50px 1px', letterSpacing: '40px',outline:'none', width:'300px'}} maxLength={5} value={code_} onChange={(e)=>{setCode_(e.target.value)}}/> <br />
                <button className="btn btn-sm btn-accent" onClick={checkCode}>Signup!</button>
            </>
            }
        </form>
    )
}