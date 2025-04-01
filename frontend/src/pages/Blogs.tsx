import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

function Blogs() {
  // store it in a state
  // store it directly here
  // store it in a context
  // create our own custom hook called useBlogs

  const { loading, blogs, error } = useBlogs();
  const navigate = useNavigate()

  
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center ">
          <div className="w-1/2">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#090D1F]">
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-7xl">
          <div className="w-full">
            <h1 className="flex justify-center font-Inter text-[10rem] text-black font-extrabold dark:text-white">
              The Blogs
            </h1>
          </div>

          <div className="w-full">
            <div className="w-full p-4">
              <h1 className="font-Inter text-base font-semibold dark:text-white">
                Recent Blog Posts
              </h1>
            </div>
            {
              !error ? (<>
                {
                  blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <BlogCard
                        id={blog.id}
                        key={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={new Date(
                          Date.parse(blog.createdAt)
                        ).toDateString()}
                      />
                    ))
                  ) : (
                    <div className="text-center text-red-600 text-xl font-Inter font-semibold dark:text-red-500">
                      No Blogs Currently found Create One
                    </div>
                  )
                }
              </>) : (
                <div className="flex flex-col justify-center items-center">
                  <div className="text-center text-red-500 text-xl font-Inter font-semibold dark:text-red-500">
                    Error Occured {error}
                  </div>
                  <div className="text-center text-red-500 text-xl font-Inter font-semibold hover:cursor-pointer dark:text-red-500" onClick={() => navigate("/signup")}>
                    Please Signup to view the blogs
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
