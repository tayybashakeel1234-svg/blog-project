import { useState } from "react";
import "./auth.css";

function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Reset Password</h2>

        {!sent ? (
          <>
            <input type="email" placeholder="Enter your email" />
            <button onClick={() => setSent(true)}>
              Send Reset Link
            </button>
          </>
        ) : (
          <p className="success">Check your email for reset link</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
