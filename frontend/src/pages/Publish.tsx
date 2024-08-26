import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const navigate = useNavigate();
    // console.log(title, content)

  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8 dark:text-white">
        <div className="max-w-screen-lg w-full">
          <input
            className="block p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-lg dark:bg-[#090D1F] dark:text-white placeholder:text-lg placeholder:font-semibold"
            placeholder="Title.."
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
          type="submit"
          className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white shadow-lg
          bg-blue-700 rounded-lg focus:ring-2 focus:ring-blue-600 hover:bg-blue-800"
          onClick={
            async() => {

              if(!title || !content){
                alert("Please Fill the content")
                return
              }
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content
                }, {
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })


                navigate(`/blog/${response.data.id}`)
            }
          }
        >
          Publish post
        </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;

function TextEditor({onChange} : {onChange : (e: React.ChangeEvent<HTMLTextAreaElement>) => void}) {
  return (
    <div className="mt-4">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border">
          <div className="bg-white rounded-b-lg w-full dark:bg-[#090D1F] dark:text-white placeholder:text-base placeholder:font-semibold">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows={8}
              onChange={(e) => onChange(e)}
              className="pl-2 py-3 block w-full rounded-md px-0 text-base text-gray-800 shadow-lg bg-white border-0 dark:bg-[#090D1F] dark:text-white"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
       
      </div>
    </div>
  );
}
