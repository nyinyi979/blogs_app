import { Dropbox } from "dropbox";
let dropbox = new Dropbox({accessToken: process.env.NEXT_PUBLIC_DROPBOX_TOKEN});
import Image from "next/image";
//get image data for displaying in sidebar or in each blogs
//two type SIZES are available 

type props = {path:string , size: "w256h256"|"w1024h768"};
export default function GetThumbnail(path:string , size: "w256h256"|"w480h320"|"w1024h768", element:string):string{
    dropbox.filesGetThumbnail({
        path: path,
        size: { '.tag': size}
    }).then((res)=>{
        let img_data = window.URL.createObjectURL(res.result.fileBlob);
        document.getElementById(element)?.setAttribute('src',img_data);
    }).catch((err)=>{
        console.log(err);
        return "error";
    });
    return "not good";
}