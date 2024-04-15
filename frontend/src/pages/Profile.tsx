import { useNavigate, useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useProfile } from "../hooks";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Profile() {
  const { id } = useParams();

  const { user, loading } = useProfile(id as string);

  const [isInput, setIsInput] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const sendUsername = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    console.log(token);

    try {
        await axios.put(
        `${BACKEND_URL}/api/v1/user/change-username`,
        { username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setIsInput((prev) => !prev);
    setUsername("");




    //  i am using artificial reload here 

    window.location.reload();


    
  };

  //   console.log(user?.posts)
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <Appbar />
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-7 border-r border-slate-600 flex flex-col items-center pt-12 overflow-y-hidden">
          <div className="w-[70%]">
            <div className="text-4xl font-bold mb-8">
              {user?.name || "Anonymous"}
            </div>
            <div className="text-lg font-medium cursor-pointer mb-8">
              <span className="border-b border-slate-600">Home</span>
            </div>
            <div className="text-xl font-semibold mb-4">Post</div>
            <div>
              {user?.posts.map(((post) => (
                <div key={post.id} className="bg-zinc-100 shadow-md p-4 rounded-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-semibold">{post.title}</div>
                    <div className="text-lg font-medium text-slate-600 flex justify-end items-end">
                     {new Date(Date.parse(post.createdAt)).toDateString()}
                    </div>
                  </div>
                  <div className="text-slate-700">{post.content}</div>
                </div>
              )))}
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col items-center pt-12">
          <div className="w-1/2">
            <div className="w-[90%] flex flex-col items-start">
              <div className="mb-4">
                <Avatar size="big" authorName={user?.name || "Anonymous"} />
              </div>
              <div className=" text-lg font-semibold flex items-center">
                {isInput ? (
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    placeholder="UserName"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  user?.name || "Anonymous"
                )}
                {!isInput ? (
                  <button
                    className="px-2 text-sm rounded-sm text-green-600 border border-green-700 py-1 bg-transparent ml-4"
                    onClick={() => setIsInput((prev) => !prev)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="ml-2 px-2 rounded-sm py-1 text-green-600 border border-green-700"
                    onClick={sendUsername}
                  >
                    Save
                  </button>
                )}
              </div>

              <div className="text-slate-600 font-medium">100K followers</div>

              <div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold mt-4 rounded-md mr-4">
                  Follow
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-semibold mt-4 rounded-md"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signup");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
