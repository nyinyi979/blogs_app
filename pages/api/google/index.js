import passport from "@/pages/_passport/passport-google-auth"; 

//authentication is done here
//when the route /api/google is called, this functioin will be called
export default async function (req , res , next){
    passport.authenticate('google' ,{
        scope: ['profile', 'email'],
        session: false
    })(req, res , next);
}