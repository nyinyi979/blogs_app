"use client"
import { Editor } from "@tinymce/tinymce-react";
import {FaFloppyDisk} from 'react-icons/fa6';
import {ImCross} from 'react-icons/im'
import axios from "axios";
import { useRef, useState } from "react";
import { displayMSG } from "@/app/_componenets/pop_ups";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import {TiTickOutline} from 'react-icons/ti';
import { AiFillCheckSquare, AiFillCloseCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
//TINYMCE EDITOR 
export default function Text_EditorP(props: {id: string, title:string , content: string , category:{name: string}[] , published: boolean, modifiedAt: string}){
  let editorRef = useRef<Editor|any>(null);
    let [ title , setTitle ] = useState(props.title);
    let [ categories , setCategories ] = useState(props.category);
    let [ category , setCategory ] = useState('');
    let [ loading , setLoading ] = useState(false);
    let modifed  = (props.modifiedAt)

    function log(){

      //checking empty title
        if(title === ''){
          document.getElementById('title')!.focus();
          return;
        }

        //checking word length
        if(editorRef.current.getContent().length > 5000){
          alert("You are writing too much! ( Or it might be a server issue :) )")
          return;
        }

        //edit request
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/editBlog', {title: title , content: editorRef.current.getContent() , id: props.id} )
        .then((res)=>{
          window.location.assign('/profile')
        })
        .catch((err)=>{
          throw Error("Server error");
        })
    }

    //category adding
    function addCat(id:string){
      setLoading(true);

      //pattern matching
      let pattern2 = /['":;{}()\/\]\[ ]/g;
        if(category.match(pattern2)){
            document.getElementById('err')!.innerText = `. , { , } , : , ; , ' , " , [ , ] , space must not be in the input box. Use _ instead of space!!`;
            setTimeout(()=>{
              document.getElementById('err')!.innerText = '';
            }, 2000) 
            return;
        }
        if(category === ''){
          document.getElementById('err')!.innerText = 'Put a category first';
          setTimeout(()=>{
            document.getElementById('err')!.innerText = '';
          }, 2000)
          return;
        }

        //request made to server
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/addCategory' , {id: id , name: category} )
        .then((res)=>{
          displayMSG('s', 'Category added!');
          //creating a new array of categories 
          setCategories([...categories , {name: category}]);
          setCategory("");
          document.getElementById('input_box')!.style.display = 'none';
        })
        .catch(()=>{
          displayMSG('e', 'Something went wrong!');
          setCategory("");
          document.getElementById('input_box')!.style.display = 'none';
        })
        setLoading(false);
    }

    //remove category

    function removeCat(id: string , category:string ){
      setLoading(true);
      axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/removeCategory' , {id: id , name: category} )
      .then(()=>{
        displayMSG('s', 'Category removed');
        document.getElementById(category)!.style.display = 'none'
      })
      .catch(()=>{
        displayMSG('e', 'Something went wrong!');
        document.getElementById(category)!.style.display = 'block';
      })
      setLoading(false);
    }

    //category box

    function showInput(type: 'O'|'C'){
      setLoading(true);
      if(type === 'O'){
        document.getElementById('input_box')!.style.display = 'block';
      }
      else{
        document.getElementById('input_box')!.style.display = 'none';
        setCategory("");
      }
      setLoading(false);
    }

    return(
    <div className="w-10/12 max-h-fit m-5 mx-auto">
      <div className="my-2">
        <div className="text-neutral my-2">Your blog&apos;s title</div>
        <input type="text" name="name" id="title" value={title} placeholder='TITLE' size={40} className='input input-bordered input-primary input-md text-neutral' onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
      </div>
        <Editor 
        onInit={(evt, editor) => editorRef.current = editor}
        id='editor'
        //INITIAL VALUE returned from server for existing blog
        initialValue={props.content}
        init={{
          menubar: ' edit view insert format tools table help',
          plugins: [
            'fullscreen' , 'emoticons' , 'lists' 
          ],
          toolbar: 'undo redo | bold italic forecolor | alignleft aligncenter alignright alignjustify' 
            + '| blocks bullist numlist outdent indent | ' +
            'removeformat | help | wordcount | table tabledelete ',
          content_css: 'default',
          height: 600,
          max_height: 700
        }}
      />
      <div className="my-2">
        <div className="text-neutral my-2">Categories </div>
        {categories.map((val , i)=>{
          return (
            <button className="btn btn-secondary btn-sm my-2 mx-1 rounded-md" key={i} id={val.name}>{val.name} {loading? <span className="loading loading-spinner loading-sm"></span> : <span className="btn btn-secondary btn-xs btn-square rounded-none" onClick={()=>removeCat(props.id , val.name )}><ImCross className="inline "/></span>  }</button>
          )
        })}
        <button className="btn btn-secondary btn-xs rounded-none my-1" onClick={()=>{showInput('O')}}> <BiSolidMessageSquareAdd /></button>
          {loading? <span className="loading loading-spinner loading-sm"></span> : 
          <div className="animate-slide origin-left relative w-1/2 text-secondary hidden" id="input_box">
            <input type="text" value={category} size={20} className="input input-sm text-neutral input-primary outline-none" onChange={(e)=>{setCategory(e.target.value)}}/>  
            <span className="md:relative md:ml-7 btn btn-primary btn-xs btn-square rounded-none absolute right-6 top-1"><TiTickOutline className="inline" onClick={()=>{addCat(props.id)}}/></span>
            <span className="md:relative md:-ml-5 btn btn-primary btn-xs btn-square rounded-none absolute -right-1 top-1"><ImCross className="inline" onClick={()=>{showInput('C')}}/></span>
            
          </div> 
          }
        <div id="err" className="text-warning"></div>
      </div>
      <button className="btn md:btn-sm btn-xs rounded-none btn-primary" onClick={log}>Save <FaFloppyDisk /></button>
      <Publish_ ID={props.id} published={props.published} title={props.title}/> {modifed===null? null : <span className="text-neutral ml-2">Last edited - {modifed.split('T')[0]}</span>}
    </div>
    )
}

//PUBLISHING , it is used in standalone edition page:) 
//BG color is linked to posts published or unpubilshed status in profile, so it is just for edition page
export function Publish_(props: {ID: string , published: boolean, title: string}){
  let [published , setPublished ] = useState<Boolean|null>(props.published);
  function doStuff(){
      let old_val = published;
      setPublished(null);
      if(old_val){
          axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/unPublishBlog' , {params: {id: props.ID}})
          .then(()=>{
              displayMSG('s', 'Successfully unpublished!');
              setPublished(!old_val);
          })
          .catch(()=>{
              displayMSG('e', 'Something went wrong!');
              setPublished(old_val);
          })
      }
      else {
          axios.get(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/publishBlog', {params: {id: props.ID}})
          .then(()=>{
              displayMSG('s' , 'Successfully published!');
              setPublished(!old_val);
          })
          .catch(()=>{
              displayMSG('e' , 'Something went wrong');
              setPublished(old_val);
          })
      }
  }
  return (
      <>
      <button className="btn md:btn-sm btn-xs rounded-none btn-info" onClick={()=>{published === null? null : doStuff()}}>
          {published===null? <span className="loading loading-spinner"></span> : 
          published? 'Published' : 'Not published!'}{published? <AiFillCheckSquare /> : <AiFillCloseCircle />}
      </button>
      <DeleteModal_E id={props.ID} title={props.title} />
      </>
  )
}

//deleting in edit mode
export function DeleteModal_E(props: {id: string , title: string}){
  //deletion logic
  function Delete(){
      document.getElementById('my-modal')!.style.display = 'none';
      document.getElementById('my-modal')!.click();
      axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/deleteBlog', {id: props.id})
      .then((res)=>{
        displayMSG('s' , 'Successfully deleted');
        window.location.assign('/profile');
      })
      .catch(()=>{
        displayMSG('e', 'Something went wrong');
      })

  }
  return (
      <>
      <label htmlFor='my-modal' className="btn md:btn-sm btn-xs rounded-none btn-error">Delete this! <FaTrashAlt /></label>
      
      <input type="checkbox" id='my-modal' className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-error">
          <h3 className="font-bold text-lg text-primary">{props.title}</h3>
          <p className="py-4 text-primary-focus">You are about to delete this post! </p>
          <div className="modal-action">
            <button className="btn md:btn-sm btn-xs btn-ghost border-slate-300 border-2" onClick={()=>{Delete()}}>Delete post :(</button>
            <label htmlFor='my-modal' className="btn md:btn-sm btn-xs btn-primary">Cancel</label>
          </div>
        </div>
      </div>
      </>
  )
}