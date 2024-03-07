import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id : string;
}

function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
  id 
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-solid border-slate-200 p-4 pb-4 cursor-pointer">
      <div className="flex">
          <Avatar authorName={authorName} />
        <div className="font-extralight px-2 tetx-sm flex flex-col justify-center">{authorName}</div>
        <div className="text-[10px] flex justify-center items-center ">&#9679;</div>
        <div className="pl-2 font-thin text-slate-300 text-sm flex flex-col justify-center">{publishedDate}</div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(content.length / 100)} minutes`}</div>
    </div>
    </Link>
  );
}

export default BlogCard;

export function Avatar({ authorName, size = "small" }: { authorName: string, size? : "small" | "big" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${size === "small"  ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`font-small ${size === "small" ? "text-xs":"text-sm"} text-gray-600 dark:text-gray-300`}>
        {authorName[0]}
      </span>
    </div>
  );
}
