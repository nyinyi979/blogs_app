import axios from 'axios';
import {FaTrashAlt} from 'react-icons/fa';

//This message box is used for several purpose
export default function MsgBox(){
    return(
        <div className='alert hidden fixed bottom-10 z-20 w-1/2 ml-28 md:ml-48 lg:ml-80' id="msg_box"></div> 
    )
}
//DisplayMSG will change the error and success color for the text and backgroundcolor of the alert box
export function displayMSG(type: 'e'|'s' , info: string){
    document.getElementById('msg_box')!.style.display = 'block';
    if(type === 'e'){
        document.getElementById('msg_box')!.classList.add('alert-error');
        document.getElementById('msg_box')!.innerHTML = info;
    }
    else {
        document.getElementById('msg_box')!.classList.add('alert-success');
        document.getElementById('msg_box')!.innerHTML = info;
    }
    setTimeout(()=>{
        document.getElementById('msg_box')!.style.display = 'none';
        document.getElementById('msg_box')!.classList.remove('alert-success');
        document.getElementById('msg_box')!.classList.remove('alert-error');
    }, 3000)
}


//for deleting
export function DeleteModal(props: {id: string , title: string, createdAt: string }){
    //deletion logic
    function Delete(){
        //this is to hide the display of the ID of the blog box
        //the deletion will be done and the display will be fixed without needing to fetch again:)
        document.getElementById(props.id)?.click();
        axios.post(process.env.NEXT_PUBLIC_BASE_FETCH_URL + '/deleteBlog' , {id: props.id})
        .then((res)=>{
          displayMSG('s' , 'Successfully deleted');
          document.getElementById(`blogs_${props.id}`)!.style.display = 'none';
        })
        .catch((err)=>{
          displayMSG('e', 'Something went wrong');
          document.getElementById(`blogs_${props.id}`)!.style.display = 'block';
        })
    }
    return (
        <>
        <label htmlFor={props.id} className="btn md:btn-sm btn-xs btn-error rounded-none">Delete this! <FaTrashAlt /></label>
        
        <input type="checkbox" id={props.id} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-error">
            <h3 className="font-bold text-lg text-primary">{props.title}</h3>
            <p className="py-4 text-primary-focus">You are about to delete this post! You created this on {props.createdAt}</p>
            <div className="modal-action">
              <button className="btn md:btn-sm btn-xs btn-ghost border-slate-300 border-2" onClick={()=>{Delete()}}>Delete post :(</button>
              <label htmlFor={props.id} className="btn md:btn-sm btn-xs btn-primary">Cancel</label>
            </div>
          </div>
        </div>
        </>
    )
}

