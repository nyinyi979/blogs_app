import { Dropbox } from "dropbox";
let dropbox = new Dropbox({refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN , clientId: process.env.NEXT_PUBLIC_DROPBOX_ID, clientSecret: process.env.NEXT_PUBLIC_DROPBOX_SECRET});
//get image data for displaying in sidebar or in each blogs
//two type SIZES are available 

export default function GetThumbnail(path:string , size: "w256h256"|"w480h320"|"w1024h768", element:string):string{
    dropbox.filesGetThumbnail({
        path: path,
        size: { '.tag': size}
    }).then((res)=>{
        let img_data = window.URL.createObjectURL(res.result.fileBlob);
        document.getElementById(element)?.setAttribute('src',img_data);
    }).catch((err)=>{
        return "error";
    });
    return "not good";
}