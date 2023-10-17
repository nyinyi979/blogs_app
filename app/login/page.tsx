'use client'
import { useState } from "react";
import { Login, Signup } from "./_components/account_box";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";
export default function LoginPage() {
  let [ login , setLogin ] = useState(true);
  return (
    <div className="mt-16 mx-auto w-64 py-40 text-center">
      {login? 
      <Login />
      :
      <Signup />
      } 
      {login? 
      <button className="btn btn-accent btn-outline my-2 btn-sm w-full" onClick={()=>{setLogin(false)}}>Sign up</button> :
      <button className="btn btn-accent btn-outline my-2 btn-sm w-full" onClick={()=>{setLogin(true)}}>Login</button> }
    </div>
  );
};
