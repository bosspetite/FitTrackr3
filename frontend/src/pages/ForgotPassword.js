import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      setMsg("If an account with that email exists, a password reset link has been sent.");
    }, 1500);
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <h2 className="mb-4 text-primary text-center fw-bold">Forgot Password</h2>
        {msg && <div className="alert alert-success text-center">{msg}</div>}
        <form style={{maxWidth: 400, margin: "0 auto"}} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-100">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </>
  );
}