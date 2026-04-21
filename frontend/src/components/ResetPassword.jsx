import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/apiSlice";
import Loader from "../components/Loader";
import "./ResetPassword.css";

const ResetPassword = () => {
  console.log("RESET PASSWORD COMPONENT MOUNTED");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const isPasswordStrong = (newPassword) => {
    // Define the criteria for password strength
    const minLength = 8; // Minimum length
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const digitRegex = /[0-9]/; // At least one digit
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character
  
    // Check if the password meets all criteria
    return (
      newPassword.length >= minLength &&
      uppercaseRegex.test(newPassword) &&
      lowercaseRegex.test(newPassword) &&
      digitRegex.test(newPassword) &&
      specialCharRegex.test(newPassword)
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  if (!isPasswordStrong(newPassword)) {
    toast.error("Password must be strong");
    return;
  }

  try {
    await resetPassword({ token, newPassword }).unwrap();
    toast.success("Password reset successful");
    console.log("Submitting reset password...");
    navigate("/login");
  } catch (err) {
    toast.error(err?.data?.message || "Something went wrong");
  }
};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="resetPasswordContainer">
      <div className="resetPasswordTitle">
        <h2>Reset Password</h2>
      </div>
 
        <form onSubmit={handleSubmit} className="resetPasswordForm">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div>
            <button type="submit" onClick={() => console.log("BUTTON CLICKED")}>Reset Password</button>
          </div>
        </form>
      </div>
   
  );
};

export default ResetPassword;
