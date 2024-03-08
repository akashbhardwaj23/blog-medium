import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-4xl font-bold mb-4">404 Not Found</div>

      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => {
        navigate("/blogs");
      }}>
        Home
      </button>
    </div>
  );
}

export default NotFound;
