import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./usefetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();

    const handleClick = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            console.log("blog deleted");
            history.push("/");
        });
    }

    return ( 
        <div className="blog-details">  
            {isPending && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <p>{blog.body}</p>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
