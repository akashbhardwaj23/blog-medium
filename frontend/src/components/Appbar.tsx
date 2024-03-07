import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center font-semibold cursor-pointer"
      >
        Medium
      </Link>
      <div>
        <Link to={"/publish"}>
          <button className="bg-transparent hover:bg-blue-500 mr-4 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            New
          </button>
        </Link>
        <Avatar authorName="Akash" size="big" />
      </div>
    </div>
  );
}

export default Appbar;
