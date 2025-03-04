'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function Read({ params }) {
    
    const { id } = React.use(params);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [edit, setEdit] = useState(false)
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            setError("Invalid post ID.");
            setLoading(false);
            return;
        }
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/posts/${id}`);
            setPost(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (err) {
            console.error("Error fetching post:", err);
            setError("Failed to load post.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/posts/${id}`, { title, content });
            
            // Manually update local state with new values cz json server dosn't update local data by itself
            setPost({ ...post, title, content });
            
            setEdit(false); 
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleDelete = async () => {
       try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            router.push('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (loading) return <p className="w-full h-screen bg-sky-100 flex text-center justify-center items-center text-7xl font-bold text-rose-300">Loading post...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="  w-full flex flex-col items-start p-6 space-y-4">
            <div className=" bg-zinc-400 shadow-lg py-3 container mx-auto "><h2 className=" text-white text-center text-2xl font-semibold ">{edit ? 'EDIT YOUR POST CONTENT' : 'SEE YOUR POST CONTENT'}</h2></div>
            <div className="  container mx-auto border-2 border-blue-200 shadow-lg py-3 px-2 space-y-4">
            {post && (
                <div>
                     { edit ? (
                        <div className="container mx-auto   ">
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-3">
                                <input onChange={(e)=> setTitle(e.target.value)} className="py-1 px-6 w-[500px] outline-0 border-2 border-gray-300 " type="text" value={title} required/>
                                <textarea onChange={(e)=> setContent(e.target.value)} className="py-2 px-6 w-[500px] outline-0 border-2 border-gray-300" value={content} required></textarea>
                                <button className="w-[500px] bg-sky-500 p-2 rounded-sm shadow-lg text-center text-white ">SAVE</button>
                            </form>
                        </div>
                     ) :  <div >
                     <h1 className="font-bold text-sky-300 text-[35px]">{post?.title}</h1>
                      <p className="text-[18px] text-zinc-600 font-medium">{post?.content}</p>
                   </div>

                     } 
                </div>
               
            )

            }
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 p-2 gap-3 md:gap-0 ">
               
                <Link className="bg-sky-600 p-2 rounded-sm shadow-lg text-center text-white" href="/"> <button  >HOME</button> </Link>
                <button className="bg-sky-500 p-2 rounded-sm shadow-lg text-center text-white" onClick={()=> setEdit(!edit)} >EDIT</button>
                <button onClick={handleDelete} className="bg-sky-400 p-2 rounded-sm shadow-lg text-center text-white">DELETE</button>
            </div>
        </div>
    );
}
