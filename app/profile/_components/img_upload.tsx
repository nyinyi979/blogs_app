"use client"
import { ChangeEvent , useState} from 'react';
import axios from 'axios';
import GetThumbnail from "@/app/_componenets/dynamic_components/getImageData";
import {FaFloppyDisk} from 'react-icons/fa6';
import { displayMSG } from "@/app/_componenets/pop_ups";
import { FaTrashAlt } from 'react-icons/fa';

//IMAGE UPLOAD FORM
export default function Img_upload(prop:{id: string, images: {url: string , location: string}[] }){
    let [ File , setFile ] = useState<ChangeEvent<HTMLInputElement>|undefined>(undefined);
    let [ location , setLocation ] = useState('T');
    let [ name , setName ] = useState('');
    let [ error , setError ] = useState('');
    let [ loading , setLoading ] = useState(false);
    let [ images , setImage ] = useState<{url: string , location: string}[]>(prop.images);
    //CHECKING FILE SIZE OF THE IMAGE 
    function fileSizeCheck(input: any){
        const fileSize = input.target.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 2) {
            setError("File size must be smaller than 2MB!");
            setTimeout(()=>{
                setError("");
            }, 3000)
        }
        else{
            setName((input.target.files[0].name).split(".")[0]);
            displayPicture(input);
        }
    }

    //DISPLAY IMAGE UPLOADED BY USER
    function displayPicture(input: any) {	
        var file = input.target.files[0]; 
        var reader = new FileReader();
        reader.onload = function () { 
          if(typeof reader.result === "string"){
           document.getElementById('preview_img')?.setAttribute('src' , reader.result)
          }
        }; 
        reader.readAsDataURL(file);
    }
    
    //UPLOAD THE PICTURE BY POSTING TO THE SERVER
    function uploadPicture(){
        var data = new FormData();
        let i = 0;
        let result:boolean = true;
        while(i < prop.images.length){
            if(location === prop.images[i].location){
                displayMSG('e' , 'Image is already at that position!');
                result = false;
                break;
            }
            else {
                result = true;
            }
            i++;
        }
        if(File && File.target.files && result){
            let file = File.target.files[0];
            data.append('location', location);
            data.append('avatar',file);
            data.append('name', name);
            data.append('id',prop.id);
            setLoading(true);
            axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL +'/api/imageUpload' , data )
            .then((res)=>{
                displayMSG('s' , 'Successful! You can upload more later:)');
                console.log(res.data);
                let new_image = [...images , res.data]
                setImage(new_image);
            })
            .catch(()=>{
                displayMSG('e' , 'Server error');
            })
            .finally(()=>{
                document.getElementById('preview_img')?.setAttribute('src' , '');
                setName('');
                setLoading(false);
            })
        }
    }

    return(
        <>
        <Photo_Display images={images}/>
        <div id='upload' className='w-10/12 max-h-fit m-5 mx-auto'>
            <label htmlFor="avatar" className='btn btn-primary btn-sm my-2'><FaFloppyDisk /> Image Upload<input type="file" name="avatar" id="avatar" className='hidden' onChange={(input)=>{fileSizeCheck(input); setFile(input); }}/></label>
            <img src="" alt="image" id='preview_img' className='w-72 h-full bg-cover my-2'/>
            <div className='join bg-primary p-2'>
            <div className="tooltip tooltip-right" data-tip="Change your image name before uploading!"><input type="text" name="name" id="name" value={name} placeholder='imgName' size={10} className='input input-bordered input-primary input-sm text-neutral' readOnly={true} /></div>
                <div className="tooltip" data-tip="Image position"><select name="location" className='select select-primary select-sm text-neutral' id="location" onChange={(event)=>{setLocation(event.target.value)}}>
                    <option className='bg-primary ' value="T" defaultChecked>Top </option>
                    <option className='bg-primary ' value="B">Bottom </option>
                    <option className='bg-primary ' value="M">Middle </option>
                </select>
                </div>
            </div>
            <div className='text-red-500'> {error} </div>
            <button type="submit" className='btn btn-primary btn-sm' onClick={()=>{loading? null : uploadPicture()}}>{loading? <span className='loading loading-spinner'></span> : 'upload'}</button>
        </div>
        </>
    )
}

//SHOWING CURRENT IMAGES
export function Photo_Display(prop: {images: {url: string , location: string}[] }){
  return(
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 w-10/12 max-h-fit m-5 mx-auto gap-1" id="parent">
      {prop.images.map((val , i)=>{
        let img_id = val.url.split('.')[0];
        GetThumbnail(val.url , 'w480h320' , img_id);
        return (
        <div className="col-span-1 relative text-neutral" key={i} id={val.location}>
            {val.location === 'T'? 'Top Image' : val.location === 'B'? 'Bottom Image' : val.location === 'M'? 'Middle Image' : null}
            <img src="" alt="images" id={img_id} className="w-fit"/>
            <DeleteModal_Photo images={val}/>
        </div>
        )
      })}
    </div>
    </>
  )
}

export function DeleteModal_Photo(props: {images: {url: string , location: string}}){
  //deletion logic
  let modal_id = `m_${props.images.location}`;
  async function Delete(){
    //hiding the image first 
    document.getElementById(props.images.location)!.style.display = 'none'
    //accessing the delete route 
    await axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/api/deleteImage' , {url: props.images.url})
    .then(()=>{
      displayMSG('s' , "Image deleted");
      //hiding the modal and image column after deletion
      document.getElementById(modal_id)!.style.display = 'none';
      document.getElementById(props.images.location)!.style.display = 'none';
      document.getElementById(`btn_${modal_id}`)?.click();
    })
    .catch(()=>{
      displayMSG('e', 'Something went wrong!');
      document.getElementById(props.images.location)!.style.display = 'block';
    })
    
  }
  return (
      <>
      <label htmlFor={modal_id} className="btn md:btn-sm btn-xs rounded-none btn-error my-3">Remove image!<FaTrashAlt /></label>
      
      <input type="checkbox" id={modal_id} className="modal-toggle" />
      <div className="modal absolute">
        <div className="modal-box bg-error">
          <p className="py-4 text-primary-focus">You are about to delete this photo! </p>
          <div className="modal-action">
            <button className="btn md:btn-sm btn-xs btn-error border-slate-300 border-2" onClick={()=>{Delete()}}>Delete photo :(</button>
            <label htmlFor={modal_id} className="btn md:btn-sm btn-xs btn-primary" id={`btn_${modal_id}`}>Cancel</label>
          </div>
        </div>
      </div>
      </>
  )
}