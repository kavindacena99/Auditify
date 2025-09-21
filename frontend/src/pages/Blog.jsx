import Navbar from "../components/Navbar";
import API from "../services/api";
import { useEffect, useState } from "react";
    
function Blog(){
    const [ blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try{
          const blog = await API.get("/blog/admin/blogs");
          setBlogs(blog.data);
        }catch(error){
          console.error("Erorr loading services");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return(
        <div>
            <Navbar />
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Latest Blogs</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <div
                        key={index}
                        className="bg-white rounded shadow hover:shadow-lg transition"
                        >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-48 object-cover rounded-t"
                        />
                        <div className="p-6 text-left">
                            <p className="text-sm text-gray-500 mb-2">
                            {blog.date} • {blog.author}
                            </p>
                            <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                            <p className="text-gray-600 mb-4">{blog.description}</p>
                            <a
                            href="#"
                            className="text-blue-600 hover:underline font-medium"
                            >
                            Read More →
                            </a>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Blog;