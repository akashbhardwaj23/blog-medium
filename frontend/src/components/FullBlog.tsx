import { BlogType } from "../types/type";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

function FullBlog({blog} : {
  blog : BlogType
}) {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl gap-x-6">
          <div className="col-span-8 px-2">
            <div className="text-5xl font-extrabold break-words dark:text-white">
              {blog.title}
            </div>
            <div className="text-slate-600 pt-4 dark:text-gray-200">
              Post on {new Date(blog.createdAt).toString()}
            </div>
            <div className="pt-4 text-lg dark:text-white break-words break-all">{blog.content}</div>
          </div>
          <div className="col-span-4">       
            <div className="text-slate-600 text-lg font-medium dark:text-gray-200">
              Author
            </div>
            <div className="flex">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar
                  size="big"
                  authorName={blog.author.name || "Anonymous"}
                />
              </div>
              <div>
                <div className="text-2xl font-bold dark:text-white">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500 dark:text-gray-100">
                  Random Catch phrase about the author's ability to grab the
                  user's attention
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
