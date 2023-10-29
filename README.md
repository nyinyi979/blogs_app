# blogs_app
Blogging app ( PLEASE CHECK THE NOTES )

## Language and libraries used

### Frontend
- React , NextJS , Tailwind , React-Icons , DaisyUI
### Backend
- NodeJS , Express( custom server for NextJS frontend )
### Data fetching (connecting to rest API )
- React Query ( tanstack ) , Axios
### Database and ORM
- postgres db with Prisma ORM , Dropbox for Image storing
### Authentication  
- Gmail with OTP Code and Log in with Google
---
## Description 
- Allows users to post blogs 
- Allows users to give likes to blogs
- Search by category , author , created date
- Able to upload 3 picture for every blog!
- Some routes are protected , meaning the user will be redirected to login page if they try to access those routes.
---
## Features coming soon
- Displaying all 3 pictures uploaded for each blog
- Commenting on blogs
---
## NOTES
The backend and frontend are separate hosted on each separate server. ( Rest API ) <br />
The backend code source is not available to read, of course , for security reasons <br />
If there is a 'Server error' message shown, sever might be down :)  <br />
if the images are not displaying right, it must be due to the expired Dropbox token ( it needs to be renewed 3-4 hours ), that can also cause user not being able to upload picture )
Can see the application on - https://blogs-app-one.vercel.app/
