import axios from "axios";
import { useEffect, useState } from "react"
let uploaded_categories:string[] = [];
type prop = {name: string, username: string, email: string, phone: string, posts: {categories: {name: string}[]}[], _count: {posts: number}, profile:{url: string}}
export default function UserBox(props: {prop: prop}){
    //adding categories
    props.prop.posts.map((val)=>{
        val.categories.map((value)=>{
            uploaded_categories.push(value.name);
        })
    });
    uploaded_categories = [...new Set(uploaded_categories)];
    return(
        <div>
            <label htmlFor="my_modal" className="btn btn-outline btn-accent btn-sm">User card</label>
            <input type="checkbox" id="my_modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box bg-gradient-to-tr from-primary to-secondary">
                <h3 className="font-bold text-md px-4 text-neutral hover:text-white duration-300">User card</h3>
                <div className="py-2">
                    <div className="relative">
                        <div className="text-neutral rounded-md m-2 p-2 bg-primary scale-95 hover:scale-100 duration-300">
                            Name - <span className="text-neutral hover:text-white duration-300">{props.prop.name} </span> 
                        </div>
                        <div className="text-neutral rounded-md m-2 p-2 bg-primary scale-95 hover:scale-100 duration-300">
                            Username - <span className="text-neutral hover:text-white duration-300">{props.prop.username} </span>
                        </div>
                        <div className="text-neutral rounded-md m-2 p-2 bg-primary scale-95 hover:scale-100 duration-300">
                            Email - <span className="text-neutral hover:text-white duration-300">{props.prop.email}</span>
                        </div>
                        <div className="text-neutral rounded-md m-2 p-2 bg-primary scale-95 hover:scale-100 duration-300">
                            Number of posts - <span className="text-neutral hover:text-white duration-300">{props.prop._count.posts}</span>
                        </div>
                        <div className="text-neutral rounded-md m-2 p-2 bg-primary scale-95 hover:scale-100 duration-300">
                            Categories that you have written - {uploaded_categories.map((val, i)=>{return <button className="btn btn-outline btn-xs ml-1 mt-1 rounded-none" key={i}>{val}</button>})}
                        </div>
                    </div>
                </div>
              </div>
                <label className="modal-backdrop" htmlFor="my_modal">Close</label>
            </div>
        </div>
    )
}
