import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from "./Components/User/MenuBar";
import HomePage from "./Components/User/HomePage";
import PostBlog from "./Components/User/PostBlog";
import UserProfile from "./Components/User/UserProfile";
import "./Components/User/User.css";
import UserLogin from "./Components/Auth/UserLogin";
import UserSignup from "./Components/Auth/UserSignup";
import AdminLogin from "./Components/Auth/AdminLogin";
import "./Components/Auth/Auth.css";
import AdminPanel from "./Components/Admin/AdminPanel";
import UserManager from "./Components/Admin/UserManager";
import PostManager from "./Components/Admin/PostManager";
import "./Components/Admin/Admin.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Paths Related to Home of User */}
          <Route exact path="/" element={<MenuBar />}>
            <Route path="" element={<HomePage />} />
            <Route path="postblog" element={<PostBlog />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Authentication Paths */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* AdminPanel Paths */}
          <Route path="/adminpanel" element={<AdminPanel />}>
            <Route path="user-manager" element={<UserManager />} />
            <Route path="post-manager" element={<PostManager />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
