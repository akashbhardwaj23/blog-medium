import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useId, useTheme } from "../hooks/index";

function Appbar() {
  // const pathname = useLocation();
  // const navigate = useNavigate();

  const { id } = useId();

  // console.log(id)

  /*

  Need to find a better way to use id because this hook is used at two places In here and in Profile.tsx

*/

  return (
    <div className="border-b flex justify-between px-10 py-4 dark:text-white">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center font-Inter font-bold cursor-pointer dark:text-white"
      >
        Medium
      </Link>
      <div className="flex items-center">
        <Link to="/blogs">
          <h1 className="flex items-center text-lg mr-4">Blogs</h1>
        </Link>

        <Link to={"/publish"}>
          <button className="bg-transparent hover:bg-blue-500 mr-4 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded dark:text-white ">
            Write
          </button>
        </Link>
        

        <div className="mr-4 cursor-pointer">
          <svg
            className="size-8 text-neutral-900 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>

        <div className="flex items-center mr-4">
          <Modes />
        </div>

        <Avatar authorName="Akash" size="big" id={id} />
      </div>
    </div>
  );
}

export default Appbar;

function Modes() {
  const { theme, setTheme } = useTheme();

  console.log("Theme is ", theme)

  return (
    <input
      data-hs-theme-switch=""
      className="relative w-[3.25rem] h-7 bg-black checked:bg-none checked:bg-white border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent focus:border-gray-700 focus:ring-gray-700 dark:focus:border-gray-100 dark:focus:ring-gray-100 focus:outline-none appearance-none

before:inline-block before:size-6 before:bg-white checked:before:bg-black before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200

after:absolute after:end-1.5 after:top-[calc(50%-0.40625rem)] after:w-[.8125rem] after:h-[.8125rem] after:bg-no-repeat after:bg-[right_center] after:bg-[length:.8125em_.8125em] after:transform after:transition-all after:ease-in-out after:duration-200 after:opacity-70 checked:after:start-1.5 checked:after:end-auto"
      type="checkbox"
      id="darkSwitch"
      checked={theme === "light" ? false : true}
      onChange={() => {
        if(theme === "light"){
          setTheme("dark")
        } else {
          setTheme("light")
        }
      }}
    />
  );
}
