import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostBlog() {
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const history = useNavigate();

    const postBlog = async (e) => {
        e.preventDefault();
        if (title.trim() === "" || content.trim() === "") {
            alert("Please enter title and content.");
            return;
        }

        try {
            // Get token from localStorage
            const token = localStorage.getItem("token");

            // Make sure token is present
            if (!token) {
                alert("User not authenticated. Please login.");
                history("/");
                return;
            }

            // Include token in the headers of the POST request
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a POST request to add the post
            const response = await axios.post(
                "http://localhost:8080/addBlog",
                {
                    title,
                    content,
                },
                config
            );

            console.log(response.data); // Log the response data

            // Clear the form after successful submission
            settitle("");
            setcontent("");
            alert("Post added successfully!");
            history("/");
        } catch (error) {
            console.error("Error adding post:", error);
            alert("Failed to add post. Please try again later.");
        }
    };

    return (
        <div id="PostBlog">
            <h1>Add a Blog</h1>
            <form onSubmit={postBlog}>
                <input
                    type="text"
                    value={title}
                    placeholder="Add title for your Blog"
                    onChange={(e) => {
                        settitle(e.target.value);
                    }}
                />
                <input
                    id="contentdiv"
                    type="text"
                    placeholder="Share your story....."
                    value={content}
                    onChange={(e) => {
                        setcontent(e.target.value);
                    }}
                />
                <button className="postblog">Post Blog</button>
            </form>
        </div>
    );
}

export default PostBlog;