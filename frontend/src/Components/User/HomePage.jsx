import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
    const [blogList, setBlogList] = useState([]);
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getAllBlogs");
            setBlogList(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const OnePost = () => {
        return blogList.map((blog, index) => {
            return (
                <div className="card" key={index}>
                    <div className="body">
                        <h1>{blog.title}</h1>
                        <p className="text">{blog.content}</p>
                        <span class="username">from: @{blog.uploader.username}</span>
                    </div>
                </div>
            );
        });
    };

    if (!blogList) {
        return <h1>No blogs have been posted yet</h1>;
    }
    return (
        <>
            <div id="HomePage">{OnePost()}</div>;
        </>
    );
}

export default HomePage;