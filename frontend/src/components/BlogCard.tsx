import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-solid border-slate-300 p-4 pb-4 cursor-pointer">
        <div className="flex">
          <Avatar authorName={authorName} />
          <div className="font-normal px-2 tetx-sm flex flex-col justify-center">
            {authorName}
          </div>
          <div className="text-[10px] flex justify-center items-center text-slate-600">
            &#9679;
          </div>
          <div className="pl-2 font-extralight text-slate-500 text-sm flex flex-col justify-center">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minutes`}</div>
      </div>
    </Link>
  );
}

export default BlogCard;

export function Avatar({
  authorName,
  size = "small",
}: {
  authorName: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-medium ${
          size === "small" ? "text-xs" : "text-sm"
        } text-gray-600 dark:text-gray-300 flex items-center justify-center`}
      >
        {authorName[0]}
      </span>
    </div>
  );
}
