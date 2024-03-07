import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";


interface BlogProps {

}


function Blogs() {

    // store it in a state
    // store it directly here
    // store it in a context
    // create our own custom hook called useBlogs

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            id="1"
            authorName="John Doe"
            title="Blog Title ldgscx chhhhdcbxjbjbdjxcbbnkjfbjbefghjfgfdcDvf"
            content="This is the content of the blog iwgdsuxiucdnnnckjkcjkjnkjckjjnfvjkbjvbkjvbkjbkjvbvkjbghiurhjibkjvbiubfrkj kjnvjvnkjfvnkjnkjbkjcjxhdsojslknckjj cklnxkdbdnj"
            publishedDate="2021-08-12"
          />
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
