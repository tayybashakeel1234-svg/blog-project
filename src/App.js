import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgetPassword from "./ForgotPassword";
import AuthPage from "./AuthPage"; // Signin/Signup component
import BlogPage from "./BlogPage"; // abhi BlogPage bhi route main rehne do
import HomePage from "./pages/HomePage";
import { Navigate } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
