"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/posts", { title, content });
    router.push("/");
  };
  return (
    <>
      <div className="container mx-auto p-6 w-full space-y-4">
        <div>
          <h2 className="text-center text-3xl font-semibold p-4 text-yellow-200 bg-sky-400 shadow-lg  ">
            Create Your Post Here !
          </h2>
        </div>
        <form
          className=" p-6 flex flex-col items-center justify-center space-y-3 shadow-lg"
          onSubmit={HandleSubmit}
        >
          <input
            className=" w-auto sm:w-[350] md:w-[500px] p-3 outline-0 border-2 border-gray-400 focus:border-sky-300 "
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            placeholder="Provide Your Post Title"
            required
          />

          <textarea
            className=" w-auto sm:w-[350] md:w-[500] p-3 outline-0 border-2 border-gray-400 focus:border-sky-300"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Provide Your Post Content"
            value={content}
            required
          />
          <div className="flex items-center justify-center gap-4">
            <button className="py-2 px-6 bg-sky-400 text-center  hover:bg-sky-200 text-white focus:scale-95 duration-300 transition-colors">
              Create
            </button>
            <Link href="/" className="py-2 px-6 bg-sky-400 text-center hover:bg-sky-200 text-white focus:scale-95 duration-300 transition-colors">
              Home
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
