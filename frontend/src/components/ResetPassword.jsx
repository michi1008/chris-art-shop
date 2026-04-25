import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/apiSlice";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const isPasswordStrong = (pw) => {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }
    if (!isPasswordStrong(newPassword)) {
      setIsError(true);
      setMessage(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      await resetPassword({ token, newPassword }).unwrap();
      setIsError(false);
      setMessage("Password updated successfully! Redirecting…");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setIsError(true);
      const msg = err?.data?.message || "Something went wrong.";
      setMessage(
        msg === "Token expired"
          ? "This reset link has expired. Please request a new one."
          : msg
      );
    }
  };

  return (
    <div className="auth-page">
      <p className="auth-brand">Chris Lange Fine Art</p>

      <div className="auth-header">
        <h2>Reset Password</h2>
        <div className="auth-divider"></div>
      </div>

      <p className="auth-description">
        Choose a strong new password for your account.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p className="password-hint">
            Min. 8 characters · uppercase · lowercase · number · special character
          </p>
        </div>

        {message && (
          <p className={`auth-message ${isError ? "auth-message--error" : "auth-message--success"}`}>
            {message}
            {isError && message.includes("expired") && (
              <>
                {" "}
                <Link to="/forget-password" className="auth-message-link">
                  Request a new link
                </Link>
              </>
            )}
          </p>
        )}

        <button className="auth-submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Updating…" : "Reset Password"}
        </button>
      </form>

      <div className="auth-links">
        <p className="auth-switch">
          Back to <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
