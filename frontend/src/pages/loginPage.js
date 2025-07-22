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
  const { login } = useAuth();
  const navigate = useNavigate();
  const auth = useAuth();
  console.log("Auth Context:", auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { email }); // Debug log
      
      const response = await fetch("http://localhost:4000/api/signin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      });

      console.log('Response status:', response.status); // Debug log
      console.log('Response headers:', response.headers); // Debug log

      // Check if response is ok first
      if (!response.ok) {
        // Try to parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Handle different error types
        if (response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else if (response.status === 400) {
          setErrorMessage(errorData.error || "Please check your input");
        } else {
          setErrorMessage(errorData.error || "Login failed. Please try again.");
        }
        return;
      }

      // Parse successful response
      let data;
      try {
        data = await response.json();
        console.log('Login response data:', data); // Debug log
      } catch (parseError) {
        console.error('Error parsing success response:', parseError);
        setErrorMessage("Invalid response from server");
        return;
      }

      // Validate response data
      if (!data.token || !data.userId) {
        console.error('Missing required data in response:', data);
        setErrorMessage("Invalid response from server");
        return;
      }

      // Store user data in auth context
      try {
        await login({
          token: data.token,
          user: {
            id: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
            classroomCode: data.classroomCode,
            hasClassroom: data.hasClassroom
          }
        });
      } catch (loginError) {
        console.error('Error storing login data:', loginError);
        setErrorMessage("Failed to complete login");
        return;
      }

      // Determine redirect path based on role and state
      let targetPath = redirectPath;
      
      if (!targetPath) {
        switch (data.role) {
          case 'admin':
            targetPath = '/admin/dashboard';
            break;
          case 'tutor':
            targetPath = data.hasClassroom ? '/tutor/dashboard' : '/create-classroom';
            break;
          case 'student':
            targetPath = '/student/dashboard';
            break;
          default:
            targetPath = '/dashboard';
        }
      }
      
      console.log('Redirecting to:', targetPath); // Debug log
      
      // Navigate to target path
      navigate(targetPath, { replace: true });
        
    } catch (error) {
      console.error('Login network error:', error);
      
      // More specific error handling
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrorMessage("Cannot connect to server. Please check if the server is running.");
      } else if (error.message.includes('CORS')) {
        setErrorMessage("Connection blocked. Please check server configuration.");
      } else {
        setErrorMessage("Network error. Please check your connection and try again.");
      }
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
                    className={`form-control ${errorMessage && !email ? 'is-invalid' : ''}`}
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errorMessage && !password ? 'is-invalid' : ''}`}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="6"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                </div>


                {errorMessage && (
                  <div className="alert alert-danger mb-3">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      <span role="status">Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/forgot-password")}
                    disabled={isLoading}
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
                      disabled={isLoading}
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
