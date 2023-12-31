import { displayMSG } from "@/app/_componenets/pop_ups";
import axios from "axios";
import { useState } from "react"

//LOGIN BOX
export function Login(){
    let [ gmail , setGmail ] = useState('');
    let [ code , setCode ] = useState('');
    let [ code_ , setCode_ ] = useState('');
    let [ loading , setLoading ] = useState(false);
    function fetchCode(){
        setLoading(true);
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/getCodeL', {mail: gmail})
        .then((res)=>{
        //Different routes for getting code , because it will check the gmail existence before setting the code
            if(res.data.notFound) {
                displayMSG('e' , 'The email is not valid ( Maybe you should create new account ) ');
                return;
            }
            setCode(res.data.code);
            setLoading(false);
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong');
            setLoading(false);
        })
    }
    function checkCode(){
        setLoading(true);
        if(code_ !== code) {
            displayMSG('e', 'The code is not correct')
            setLoading(false);
        }
        else {
            axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/checkExistingUser' , {mail: gmail})
            .then((res)=>{
                localStorage.setItem('user' , res.data.id);
                window.location.assign('/home');
            })
            .catch((err)=>{
                displayMSG('e' , 'Server error');
                setLoading(false);
            })
        }
    }
    return(
        <div>
            {code===''? 
            <div>
                <span className="text-neutral my-2 block">Login: Enter your gmail!</span>
                <input type="email" className="input input-secondary input-md text-neutral w-full my-2" placeholder="someone@gmail.com" name="gmail" id="gmail" value={gmail} size={30} onChange={(e)=>{setGmail(e.target.value)}} required/> <br />
                {loading? <span className="btn btn-sm btn-accent my-2 w-full loading loading-spinner"></span> : <button type="submit" className="btn btn-sm btn-accent my-2 w-full" onClick={fetchCode}>Send a code!</button> }
                <br />
            </div> 
            :
            <>
                <span className="text-neutral my-2 block">We have sent you a code to the gmail! </span>
                <input type="text" className="input bg-fixed input-secondary text-white font-bold w-full text-lg bg-neutral my-2 overflow-hidden caret-transparent duration-300" style={{backgroundSize: '2.79em', letterSpacing: '1.8em',outline:'none',fontFamily: "Courier New"}} maxLength={5} value={code_} onChange={(e)=>{setCode_(e.target.value)}}/> <br />
                {loading? <span className="btn btn-sm btn-accent my-2 w-full loading loading-spinner"></span> : <button className="btn btn-sm btn-accent w-full" onClick={checkCode}>Login</button> }
            </>
            }
        </div>
    )
}

//SIGNUP BOX
export function Signup(){
    let [ gmail , setGmail ] = useState('');
    let [ code , setCode ] = useState('');
    let [ code_ , setCode_ ] = useState('');
    let [ secondStage , setSecond ] = useState(false);
    let [ name , setName ] = useState('');
    let [ username , setUsername ] = useState('');
    let [ phone , setPhone ] = useState('');
    let [ loading , setLoading ] = useState(false);
    function fetchCode(){
        setLoading(true);
        //Check if gmail is empty or not
        if(gmail === ''){
            document.getElementById('gmail')!.focus();
            return;
        }
        //Different routes for getting code , because it will check the gmail existence before setting the code
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/getCodeS', {mail: gmail})
        .then((res)=>{
            if(res.data.notFound) {
                displayMSG('e' , 'The email is already used! ');
                return;
            }
            setCode(res.data.code);
            setLoading(false);
        })
        .catch(()=>{
            displayMSG('e' , 'Something went wrong');
            setLoading(false);
        })
    }
    function checkCode(){
        setLoading(true);
        if(code_ !== code) {
            displayMSG('e', 'The code is not correct');
            setLoading(false);
        }
        else {
            setSecond(true);
        }
    }
    //Creation for a new account 
    function createAccount(){
        if(name === '' || username === ''|| phone === ''){
            document.getElementById('err')!.innerText = 'The input boxes must not be empty!!';
            setTimeout(()=>{
                document.getElementById('err')!.innerText = '';
            } , 3000)
            return;
        }
        if(username.match(/['":;{}()\/\]\[ ]/g)){
            document.getElementById('err')!.innerText = `. , { , } , : , ; , ' , " , [ , ] , / , space must not be in the username.`;
            setTimeout(()=>{
                document.getElementById('err')!.innerText = '';
            } , 3000)
            return;
        }
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/checkNewUser', {name , username , gmail , phone})
        .then((res)=>{
            if(res.data.nameTake){
                document.getElementById('err')!.innerText = 'Username is already taken:(';
                return;
            }
            localStorage.setItem('user' , res.data.id);
            setTimeout(()=>{
                window.location.assign('/getting_started');
            }, 2000)
        })
        .catch(()=>{
            displayMSG('e', 'Something went wrong');
            setTimeout(()=>{
                window.location.reload();
            }, 2000)
            
        })
    }
    return(
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {secondStage? 
            <div>
                <input type="text" placeholder="name" name="name" className="input input-primary input-md my-2 w-full text-neutral" value={name} onChange={(e)=>{setName(e.target.value)}} required/> <br />
                <input type="text" placeholder="username" name="username" className="input input-primary input-md my-2 w-full text-neutral" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/> <br />
                <input type="text" placeholder="email" name="email" className="input input-primary input-md my-2 w-full text-neutral" value={gmail} readOnly/> <br />
                <input type="text" placeholder="phone" name="phone" className="input input-primary input-md my-2 w-full text-neutral" value={phone} onChange={(e)=>{setPhone(e.target.value)}} required/> <br />
                <button className="btn btn-sm btn-accent w-full" onClick={createAccount}>Create an account</button>
                <p id="err" className="text-error m-2"></p>
            </div>
            :
            code===''? 
            <>
                <span className="text-neutral my-2 block">Sign up: Enter your gmail!</span>
                <input type="email" className="input input-secondary input-md text-neutral w-full my-2" placeholder="someone@gmail.com" name="gmail" id="gmail" value={gmail} size={30} onChange={(e)=>{setGmail(e.target.value)}}/> <br />
                {loading? <span className="btn btn-sm btn-accent my-2 w-full loading loading-spinner"></span> :  <button className="btn btn-sm btn-accent w-full" type="submit" onClick={fetchCode}>Sign up!</button> }<br />
            </> 
            :
            <>
                <span className="text-neutral my-2 block">We have sent you a code to the gmail! </span>
                <input type="text" className="input bg-fixed input-secondary text-white font-bold w-full text-lg bg-neutral my-2 overflow-hidden caret-transparent duration-300" style={{backgroundSize: '2.79em', letterSpacing: '1.8em',outline:'none',fontFamily: "Courier New"}} maxLength={5} value={code_} onChange={(e)=>{setCode_(e.target.value)}}/> <br />
                {loading? <span className="btn btn-sm btn-accent my-2 w-full loading loading-spinner"></span> : <button className="btn btn-sm btn-accent w-full" onClick={checkCode}>Signup!</button> }
            </>
            }
        </form>
    )
}