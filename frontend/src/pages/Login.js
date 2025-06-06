import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://fit-trackr-backend.onrender.com"; // Use .env for flexibility in different environments

const GYM_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80";

const MOTIVATIONAL_QUOTES = [
  "Every step is progress.",
  "You’re one workout away from a good mood.",
  "Push yourself, because no one else is going to do it for you.",
  "Don’t stop when you’re tired. Stop when you’re done.",
];

function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

export default function Login() {
  const [quote] = useState(getRandomQuote());
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMsg(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      setMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center align-items-center">
        <div className="col-lg-5 col-md-8 col-12">
          <div className="card shadow-lg border-0">
            <div className="row g-0 align-items-center">
              <div className="col-md-6 d-none d-md-block">
                <img
                  src={GYM_IMAGE}
                  alt="Man using treadmill"
                  className="img-fluid rounded-start h-100 object-fit-cover"
                  style={{ minHeight: 380 }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body py-4 px-4">
                  <div className="text-center mb-3">
                    <span className="fs-2 fw-bold text-primary">FitTrackr</span>
                    <div
                      className="fw-light fs-6 text-muted mt-2"
                      style={{ minHeight: 28 }}
                    >
                      <span role="img" aria-label="quote" className="me-2">
                        💪
                      </span>
                      <em>{quote}</em>
                    </div>
                  </div>

                  <h4 className="mb-3 fw-semibold text-primary">Welcome Back</h4>

                  {msg && (
                    <div className="alert alert-info py-2" role="alert">
                      {msg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 fw-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Logging in...
                        </>
                      ) : (
                        "Log In"
                      )}
                    </button>
                  </form>

                  <div className="mt-3 text-center">
                    <small>
                      Don’t have an account?{" "}
                      <Link to="/register" className="text-primary fw-semibold">
                        Sign up
                      </Link>
                    </small>
                  </div>

                  <div className="text-center mt-2">
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="mt-4 text-center text-muted small">
                    &copy; {new Date().getFullYear()} FitTrackr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
