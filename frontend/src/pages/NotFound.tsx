import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen py-4">
      <div className="flex justify-center items-center pt-8">
        <img src="/Goodies Hey.png" alt="hey" className="w-26 h-14" />
      </div>
      <div className="text-[#4A3993] flex justify-center items-center">
        <h1 className="font-bold text-base">What are you doing here?!</h1>
      </div>
    <div className="text-[14rem] font-bold text-[#FFCF06] flex justify-center items-center">
      <h1 className="">4</h1>
      <img src="/Goodies Danger.png" alt="goodies" className="w-60 h-45 relative top-4" />
      <h1 className="">4</h1>
    </div>

    <div className="flex justify-center items-center">
      <button className="border-2 border-gray-700 px-4 py-2 rounded-lg flex" onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>

        <span className="ml-2 text-lg font-semibold">Go Home</span>
      </button>
    </div>
  </div>
  );
}

export default NotFound;
