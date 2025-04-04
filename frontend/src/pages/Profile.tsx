import { useNavigate, useParams } from "react-router-dom";
import { useProfile } from "../hooks";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Appbar from "../components/Appbar";

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

  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center min-h-96">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <Appbar />
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-7 border-r border-slate-600 flex flex-col items-center pt-12 overflow-y-hidden dark:text-gray-100">
          <div className="w-[70%]">
            <div className="text-4xl font-bold mb-8">
              {user?.name || "Anonymous"}
            </div>
            <div className="text-lg font-medium cursor-pointer mb-8">
              <span className="border-b border-slate-600 dark:border-slate-200">
                Home
              </span>
            </div>
            <div className="text-xl font-semibold mb-4">Post</div>
            <div>
              {user?.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-zinc-100 shadow-md p-4 rounded-sm cursor-pointer mb-4"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-semibold">{post.title}</div>
                    <div className="text-lg font-medium text-slate-600 flex justify-end items-end">
                      {new Date(Date.parse(post.createdAt)).toDateString()}
                    </div>
                  </div>
                  <div className="text-slate-700">{post.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col items-center pt-12">
          <div className="w-1/2">
            <div className="w-[90%] flex flex-col items-start">
              <div className="mb-2">
                <Avatar size="big" authorName={user?.name || "Anonymous"} />
              </div>
              <div className=" text-4xl font-semibold flex items-center mb-2 dark:text-gray-100">
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
                    className="px-2 text-xs rounded-sm text-green-600 border border-green-700 py-1 bg-transparent ml-4 font-Inter"
                    onClick={() => setIsInput((prev) => !prev)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="ml-2 px-2 text-lg rounded-md py-1 text-green-600 border border-green-700 font-Inter dark:hover:bg-green-50"
                    onClick={sendUsername}
                  >
                    Save
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="text-slate-600 font-medium dark:text-slate-100">
                  {user?.followers.length} Followers
                </div>

                <div className="text-slate-600 font-medium dark:text-slate-100">
                  {user?.following.length} Following
                </div>
              </div>

              <div>
                {user?.id !== id && (
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold mt-4 rounded-md mr-4">
                    Follow
                  </button>
                )}
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
