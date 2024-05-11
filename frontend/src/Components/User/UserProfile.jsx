import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UseProfile() {
    const [user, setUser] = useState({
        user: {
            _id: "663f64e773991d2d85211709",
            username: "ayush76",
            name: "Ayush Agrawal",
            password: "$2b$10$HtHidkijcohLoZ81aDdDdON2.5DFanbGQbhHjejyXyEzDWA1ERdFa",
            uploadedBlogs: [
                "663f8ddfbcfea430c4a46759",
                "663f8df4bcfea430c4a4675e",
                "663f8dffbcfea430c4a46763",
                "663f8e0abcfea430c4a46768",
                "663f8e1ebcfea430c4a4676d",
                "663f930fbcfea430c4a46772",
                "663f9a1dbcfea430c4a4677d",
            ],
            __v: 0,
        },
        blogs: [
            {
                _id: "663f8ddfbcfea430c4a46759",
                uploader: "663f64e773991d2d85211709",
                title: "The Power of Gratitude",
                content: "Discover how practicing gratitude can transform your life and improve your mental well-being.",
                __v: 0,
            },
            {
                _id: "663f8df4bcfea430c4a4675e",
                uploader: "663f64e773991d2d85211709",
                title: "Exploring Mindfulness Meditation",
                content: "Learn about the benefits of mindfulness meditation and how to incorporate it into your daily routine for a calmer mind and greater happiness.",
                __v: 0,
            },
            {
                _id: "663f8dffbcfea430c4a46763",
                uploader: "663f64e773991d2d85211709",
                title: "The Art of Productivity",
                content: "Unlock the secrets of productivity and achieve your goals with practical tips and strategies to boost efficiency and focus.",
                __v: 0,
            },
            {
                _id: "663f8e0abcfea430c4a46768",
                uploader: "663f64e773991d2d85211709",
                title: "Mastering the Art of Communication",
                content: "Enhance your communication skills and build better relationships with effective communication techniques for personal and professional success.",
                __v: 0,
            },
            {
                _id: "663f8e1ebcfea430c4a4676d",
                uploader: "663f64e773991d2d85211709",
                title: "The Joy of Reading",
                content: "Immerse yourself in the world of books and discover the endless benefits of reading for pleasure, learning, and personal growth.",
                __v: 0,
            },
            {
                _id: "663f930fbcfea430c4a46772",
                uploader: "663f64e773991d2d85211709",
                title: "Embracing Creativity",
                content: "Unleash your creativity and cultivate a more imaginative and inspired life through creative expression and exploration.",
                __v: 0,
            },
            {
                _id: "663f9a1dbcfea430c4a4677d",
                uploader: "663f64e773991d2d85211709",
                title: "The Beauty of Nature",
                content: "Connect with nature and experience its profound healing and transformative powers for physical, mental, and emotional well-being.",
                __v: 0,
            },
        ],
    });

    const history = useNavigate();
    const fetchUser = async () => {
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
            const response = await axios.get(
                "http://localhost:8080/fetchuser",
                config
            );

            console.log(response.data);
            setuser(response.data);
            // Log the response data
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to Fetch User Data. Please try again later.");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const OnePost = () => {
        return user.blogs.map((blog, index) => {
            return (
                <div className="card" key={index}>
                    <div className="body">
                        <h1>{blog.title}</h1>
                        <p className="text">{blog.content}</p>
                    </div>
                </div>
            );
        });
    };
    return (
        <div id="UseProfile">
            <div className="usercard">
                <h1>Name:{user.user.name}</h1>
                <h1>Username:{user.user.username}</h1>
                <h1>No of Blogs Uploaded:{user.user.uploadedBlogs.length}</h1>
            </div>
            <h1>Uploaded Blogs</h1>
            <div id="HomePage">{OnePost()}</div>;
        </div>
    );
}

export default UseProfile;