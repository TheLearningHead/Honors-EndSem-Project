import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostManager() {
    const [postList, setpostList] = useState([]);
    useEffect(() => {
        fetchPosts();
    }, []);

    const history = useNavigate();

    const deletePost = async (id) => {
        try {
            const token = localStorage.getItem("Admintoken");

            // Make sure token is present
            if (!token) {
                alert("Admin not authenticated. Please login.");
                history("/");
                return;
            }

            // Prompt the user for confirmation before deleting
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this user?"
            );
            if (!confirmDelete) {
                return; // If user cancels deletion, exit the function
            }

            // Include token in the headers of the DELETE request
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.delete(
                `http://localhost:8080/deletePost/${id}`,
                config
            );
            alert("Blog Deleted Successfully");
            fetchPosts();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete Blog. Please try again later.");
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getAllPosts");
            setpostList(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const OnePost = () => {
        return postList.map((post, index) => {
            return (
                <div className="card" key={index}>
                    <div className="body">
                        <h1>{post.title}</h1>
                        <p className="text">{post.content}</p>
                        <span class="username">from: @{post.uploader.username}</span>
                        <div
                            className="userdel"
                            onClick={() => {
                                deletePost(post._id);
                            }}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            );
        });
    };

    if (!postList) {
        return <h1>No Blogs Posted Yet</h1>;
    }
    return (
        <>
            <div id="HomePage">{OnePost()}</div>;
        </>
    );
}

export default PostManager;