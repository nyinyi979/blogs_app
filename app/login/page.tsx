'use client'
import { useState } from "react";
import { Login, Signup } from "./_components/account_box";
export default function LoginPage() {
  let [ login , setLogin ] = useState(true);
  return (
    <div className="mt-16 mx-auto w-full py-52 bg-secondary text-center">
      {login? 
      <Login />
      :
      <Signup />
      } 
      {login? 
      <button className="btn btn-accent btn-outline m-2 btn-sm" onClick={()=>{setLogin(true)}}>Login</button> :
      <button className="btn btn-accent btn-outline m-2 btn-sm" onClick={()=>{setLogin(false)}}>Sign up</button> }
    </div>
  );
};
