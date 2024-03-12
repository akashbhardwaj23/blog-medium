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
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title.."
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
          type="submit"
          className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white 
          bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          onClick={
            async() => {
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
          <div className="bg-white rounded-b-lg w-full ">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows={8}
              onChange={(e) => onChange(e)}
              className="pl-2 py-2 block w-full px-0 text-sm text-gray-800 bg-white border-0 "
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
       
      </div>
    </div>
  );
}
