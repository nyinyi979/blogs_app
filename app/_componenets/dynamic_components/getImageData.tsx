import axios from "axios";
import { Dropbox } from "dropbox";
let accessToken = 'sl.BpcjqqsV27ffpOWfW6GcDpF_cbpB9M1Kc8yE6tOT-6jz1Ooqesg2LhIcl8c_0yndJ-CIvHYBIvWORkwfYit1eAyfuWq902bLYI3eflcs-QZTlOESCu9FIghlJ5EJKaS1jMcdK1V75JOEbBbeHutFkaE';
setInterval(()=>{
    axios({
        url: process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/getToken'
    }).then((res)=>{
        accessToken = res.data;
    })
} , 14400)
let dropbox = new Dropbox({accessToken: accessToken});
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