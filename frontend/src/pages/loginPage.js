import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirectPath");
  const { login } = useAuth(); // Updated auth hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:6000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login with role-based routing
        const targetPath = redirectPath || 
          (data.role === 'admin' ? '/admin/dashboard' :
           data.role === 'tutor' ? (data.hasClassroom ? '/tutor/dashboard' : '/create-classroom') :
           '/student/dashboard');
        
        await login(data.token); // Store token in context
        navigate(targetPath);
      } else {
        setErrorMessage(data.error || "Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login to Your Account</h2>
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberPassword">
                    Show Password
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      <span role="status">Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="border-top pt-3 text-center">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => navigate("/register")}
                    >
                      Register here
                    </button>
                  </p>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger mt-3 mb-0">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;