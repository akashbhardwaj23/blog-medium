import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

function Blogs() {
  // store it in a state
  // store it directly here
  // store it in a context
  // create our own custom hook called useBlogs

  const { loading, blogs } = useBlogs();

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
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
