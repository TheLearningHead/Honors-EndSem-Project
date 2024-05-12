import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserManager() {
    const [userList, setuserList] = useState([]);
    const history = useNavigate();

    const deleteUser = async (id) => {
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
                `http://localhost:8080/deleteUser/${id}`,
                config
            );
            alert("User Deleted Successfully");
            fetchAllUser();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete User . Please try again later.");
        }
    };

    const fetchAllUser = async () => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem("Admintoken");

            // Make sure token is present
            if (!token) {
                alert("Admin not authenticated. Please login.");
                history("/");
                return;
            }

            // Include token in the headers of the GET request
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a GET request to fetch user data
            const response = await axios.get(
                "http://localhost:8080/getAllUsers",
                config
            );

            console.log(response.data);
            setuserList(response.data.users); // Set userList to response.data.users
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to Fetch User Data. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllUser();
    }, []);

    return (
        <div id="UserManagement">
            <div>
                <div>Sr. No</div>
                <div>Name</div>
                <div>Username</div>
                <div>No of Blogs</div>
                <div>Delete</div>
            </div>

            {userList.map((user, index) => (
                <div key={user._id}>
                    <div>{index + 1}</div>
                    <div>{user.name}</div>
                    <div>{user.username}</div>
                    <div>{user.uploadedBlogs.length}</div>
                    <div
                        className="userdel"
                        onClick={() => {
                            deleteUser(user._id);
                        }}
                    >
                        Delete
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserManager;