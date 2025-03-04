'use client'
import { useEffect, useState } from "react"
import axios from 'axios'
import Link from "next/link";

export default function Posts(){
    const [post, setPosts] = useState([])
    const fetchPost = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts');
            setPosts(response.data.reverse());
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };


    useEffect(()=> {
        fetchPost()
    }, [])

   const handleDelete = async (id) => {
    console.log("Deleting post with ID:", id); // Debugging
    try {
        const response = await axios.delete(`http://localhost:5000/posts/${id}`);
        console.log("Delete Response:", response);
        const filteredData = post.filter((item) => item.id !== id);
        setPosts(filteredData);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

    

    return (
       <>
       <div className="container  mx-auto p-6 space-y-3">
        <div className="flex justify-between items-center h-auto py-2 ">
            <Link className="create-btn" href="/posts/create">Create Post</Link>
            <h2>Here Your All Posts</h2></div>
            
        <table className="min-w-full h-auto border border-gray-200 shadow-lg" >
            <thead>
                <tr>
                    <th className="table-head">Title</th>
                    <th className="table-head">Content</th>
                    <th className="table-head">Actions</th>
                </tr>
            </thead>
            <tbody>
                {post.map(item => (
                    <tr key={item.id}>
                        <td className="table-data">{item.title}</td>
                        <td className="table-data"> {item.content?.length > 40 ? item.content.slice(0, 40) + "..." : item.content}</td>
                        <td className="table-data">
                            <Link className="main-read" href={`/posts/${item.id}`} prefetch={false} ><button>See More</button></Link>
                            <button onClick={()=> handleDelete(item.id)} className="text-red-500 bg-red-100 shadow-lg py-1 px-2 ml-2 rounded-sm">Delete</button>
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
       </>
    )
}