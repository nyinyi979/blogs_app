"use client"
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useRef } from "react";
//TINYMCE EDITOR 
export default function Text_Editor(props: {id: string}){
    let editorRef = useRef<Editor|any>(null);
    let title = useRef<HTMLInputElement>(null);
    let category = useRef<HTMLInputElement>(null);

    function log(){

      //checking empty title
        if(title.current?.value === ''){
          title.current.focus();
          return;
        }

        //checking word length
        if(editorRef.current.getContent().length > 5000){
          alert("You are writing too much! ( Or it might be a server issue :) )")
          return;
        }

        if(category.current?.value === ''){
          category.current.focus();
          return;
        }
        //regex searching for unvalid keyword
        let pattern2 = /['":;{}()\/\]\[ ]/g;
        
        if(category.current?.value.match(pattern2)){
            document.getElementById('err')!.innerText = `. , { , } , : , ; , ' , " , [ , ] , space must not be in the input box. Use _ instead of space!!`;
            setTimeout(()=>{
              document.getElementById('err')!.innerText = '';
            }, 2000) 
            return;
        }

        //stripping the categories from input into array
        let categories:string[] = [];
        category.current?.value.split(',').forEach((val)=>{categories.push(val.split("_").join(" "))})
        console.log(categories)
        //creating axios request
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/createBlog', {title: title.current?.value , content: editorRef.current.getContent() , id: localStorage.user , categories: categories} )
        .then((res)=>{
          console.log(res.data);
          window.location.assign('/profile')
        })
        .catch((err)=>{
          throw Error("Server error");
        })
    }
    return(
    <div className="w-10/12 max-h-fit m-5 mx-auto">
      <div className="my-2">
        <div className="text-neutral my-2">Your blog&apos;s title</div>
        <input type="text" name="name" id="name" value={title.current?.value} placeholder='TITLE' size={40} className='input input-bordered input-primary input-md text-neutral' ref={title}/>
      </div>
        <Editor 
        onInit={(evt, editor) => editorRef.current = editor}
        id='editor'
        
        initialValue='YOUR CONTENT HERE'
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
        <div className="text-neutral my-2">Categories ( Separate categories with , )</div>
        <input type="text" name="cat" id="cat" value={category.current?.value} placeholder='Disaster' size={40} className='input input-bordered input-primary input-md text-neutral' ref={category}/>
        <div id="err" className="text-warning"></div>
      </div>
      <button className="btn btn-sm btn-primary my-2" onClick={log}>Save as draft!</button>
      
    </div>
    )
}