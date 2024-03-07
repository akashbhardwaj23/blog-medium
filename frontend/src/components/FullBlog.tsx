import Appbar from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

function FullBlog({ blog }: { blog: Blog }) {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-600 pt-4">Post on {blog.createdAt}</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg font-medium">
            Author
            </div>
           <div className="flex">
           <div className="pr-4 flex flex-col justify-center">
           <Avatar size="big" authorName={blog.author.name || "Anonymous"} />
           </div>
              <div>
              <div className="text-2xl font-bold">
              {blog.author.name || "Anonymous"}
            </div>
            <div className="pt-2 text-slate-500">
              Random Catch phrase about the author's ability to grab the user's
              attention
            </div>
              </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
