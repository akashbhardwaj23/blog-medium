import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useId } from "../hooks/index";

function Appbar() {
  const pathname = useLocation();
  const navigate = useNavigate();

  const {id} = useId();

/*

  Need to find a better way to use id because this hook is used at two places In here and in Profile.tsx

*/


  const handleImage = () => {
    navigate("/notification");
  };
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center font-semibold cursor-pointer"
      >
        Medium
      </Link>
      <div className="flex">
        <Link to={"/publish"}>
          <button className="bg-transparent hover:bg-blue-500 mr-4 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Write
          </button>
        </Link>
        <img
          src={`${
            pathname.pathname === "/notification" ? "/dark-bell.png" : "/bell.png"
          }`}
          alt="bell"
          className="w-10 h-10 p-2 mr-2"
          onClick={handleImage}
        />
        <Avatar authorName="Akash" size="big" id={id} />
      </div>
    </div>
  );
}

export default Appbar;
