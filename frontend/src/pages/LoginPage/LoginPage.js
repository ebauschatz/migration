import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError, reset]);

  return (
    <div className="container login-page">
      <form className="form" onSubmit={handleSubmit}>
        <label>
        <span className="section-header main-color">Username:</span>{" "}
          <input data-cy="username-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span className="section-header main-color">Password:</span>{" "}
          <input data-cy="password-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials</p>
        ) : null}
        <button data-cy="login-button">Login</button>
        <Link to="/register">Click here to register!</Link>
      </form>
    </div>
  );
};

export default LoginPage;
