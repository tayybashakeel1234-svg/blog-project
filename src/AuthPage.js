import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";

function AuthPage({ mode }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================= SIGNUP =================
    if (isSignup) {
      if (password !== confirm) {
        setMessage("Passwords do not match");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,   // ✅ SAHI
            email,
            password,
          }),
        });




        const data = await res.json();

        if (res.ok) {
          setMessage("Signup successful");
          setTimeout(() => navigate("/signin"), 1500);
        } else {
          setMessage(data.msg || data.error || "Signup failed");
        }
      } catch (err) {
        setMessage("Server error");
      }

      // ================= SIGNIN =================
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("Login successful");

          // ✅ optional but correct
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          setTimeout(() => navigate("/blog"), 1000);
        } else {
          setMessage(data.error || "Login failed");
        }
      } catch (err) {
        setMessage("Server error");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>{isSignup ? "Create Account" : "Sign In"}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            ></span>
          </div>

          {isSignup && (
            <div className="password-box">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <span
                className="eye"
                onClick={() => setShowConfirm(!showConfirm)}
              ></span>
            </div>
          )}

          {!isSignup && (
            <Link to="/ForgetPassword" className="forgot">
              Forgot password?
            </Link>
          )}

          <button type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          {message && <p className="success">{message}</p>}
        </form>

        <p className="switch">
          {isSignup ? (
            <>
              Already have an account? <Link to="/signin">Sign In</Link>
            </>
          ) : (
            <>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
