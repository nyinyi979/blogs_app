"use server"
import passport from "@/_passport/passport-google-auth"; 
import { setCookie } from "cookies-next";
//Callback after being authentication
export default async function Callback(req, res , next){
    passport.authenticate('google' , (err , user)=>{
        if(err) return res.redirect('/error');
        setCookie('user' , user.token , {
            httpOnly: true,
            maxAge: 24*60*60,
            sameSite: 'lax', req, res
        });
        setCookie('new' , user.new , {
            httpOnly: true,
            maxAge: 24*60*60,
            sameSite: 'lax', req, res
        });
        return res.redirect('/process');
    })(req , res , next)
}