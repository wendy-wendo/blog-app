import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home"
import Login from "./pages/Login";
import NewBlog from "./pages/NewBlog/NewBlog"
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword"
import Blog from "./pages/Blog/Blog";
import { AuthProvider } from "./context/AuthContext";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="new">
              <Route index element={<NewBlog/>}/>
              <Route path=":id" element={<NewBlog/>} />
            </Route>
            <Route path="blog">
              <Route path=":id" element={<Blog/>}/>
            </Route>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="forgot-password" element={<ForgotPassword/>} />
            <Route path="*" element={<ErrorPage />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
