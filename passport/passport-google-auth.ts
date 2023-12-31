// /lib/passport-google-auth.ts

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import axios from "axios";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
      callbackURL: "/api/google/callback", // end point saved in google
    },
    async (_accessToken, _refreshToken, profile, cb: any) => {
      try {
        //doing the user process in the backend
        await axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/checkGoogleUser' , {data:profile})
        .then((result)=>{
          return cb(null , result.data);
        })  
        .catch((err)=>{
          console.log(err);
          return cb(err, null);
        })
      } catch (e: any) {
        console.log(e)
        window.location.assign('/error');
      }
    }
  )
);


export default passport;
