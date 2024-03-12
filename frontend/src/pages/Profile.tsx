import { useNavigate, useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useProfile } from "../hooks";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";

function Profile() {
  const { id } = useParams();

  const { user, loading } = useProfile(id as string);

    const navigate = useNavigate()

  if(loading){
    return <div>
        <Appbar />
        <div className="flex justify-center items-center h-screen">
            <Spinner />
        </div>
    </div>
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
            <div>Post</div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col items-center pt-12">
          <div className="w-1/2">
            <div className="w-[90%] flex flex-col items-start">
              <div className="mb-4">
                <Avatar size="big" authorName={user?.name || "Anonymous"} />
              </div>
              <div className="text-lg font-semibold">
                {user?.name || "Anonymous"}
              </div>
              <div className="text-slate-600 font-medium">100K followers</div>

              <div>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold mt-4 rounded-md mr-4">
                  Follow
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold mt-4 rounded-md" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/signup")
                }}>
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
