import Navbar from "../components/Navbar";

const blogs = [
  {
    title: "Why Financial Audits are Important",
    date: "September 15, 2025",
    author: "AuditCo Team",
    description: "Learn why regular financial audits can protect your business and build trust with stakeholders.",
    image: "https://via.placeholder.com/400x200",
  },
  {
    title: "Top 5 Tax Mistakes to Avoid",
    date: "September 10, 2025",
    author: "AuditCo Experts",
    description: "Discover common tax mistakes businesses make and how to avoid them with professional advice.",
    image: "https://via.placeholder.com/400x200",
  },
  {
    title: "Risk Management in 2025",
    date: "September 5, 2025",
    author: "AuditCo Insights",
    description: "An overview of modern risk management practices to safeguard your company.",
    image: "https://via.placeholder.com/400x200",
  },
];

function Blog(){
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
                            src={blog.image}
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