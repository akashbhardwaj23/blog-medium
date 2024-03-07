// could store it in a hook or

import Appbar from "../components/Appbar";
import BlogSkeleton from "../components/BlogSkeleton";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

// atom / selector families
function Blog() {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) {
    return (
      <div className="flex flex-col h-screen justify-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    );
  }
  return <div>{blog && <FullBlog blog={blog} />}</div>;
}

export default Blog;
