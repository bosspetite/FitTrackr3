import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Goal() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState({ description: "", target: "", unit: "" });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Load goals from backend on mount
  useEffect(() => {
    async function fetchGoals() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/goals`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setGoals(data.goals || []);
      } catch {
        // Optional: Show error to user
      }
    }
    fetchGoals();
  }, []);

  const handleChange = (e) => setGoal({ ...goal, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.description || !goal.target || !goal.unit) {
      setMsg("Fill in all fields."); setSuccess(false); return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goal)
      });
      const data = await res.json();

      if (res.ok) {
        setGoals([...goals, data.goal]);
        setMsg("Goal added!");
        setSuccess(true);
        setGoal({ description: "", target: "", unit: "" });
      } else {
        setMsg(data.message || "Failed to add goal."); setSuccess(false);
      }
    } catch (error) {
      setMsg("An error occurred. Please try again."); setSuccess(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold text-success text-center">Your Goals</h2>
        {msg && (
          <div className={`alert ${success ? "alert-success" : "alert-danger"}`} role="alert">
            {msg}
          </div>
        )}
        <form className="row g-3 mb-5 justify-content-center" style={{maxWidth: 500, margin: "0 auto"}} onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Goal Description</label>
            <input type="text" name="description" className="form-control" value={goal.description} onChange={handleChange} placeholder="e.g. Run 20km this week" required />
          </div>
          <div className="col-12">
            <label className="form-label">Target (number)</label>
            <input type="number" name="target" min={1} className="form-control" value={goal.target} onChange={handleChange} placeholder="e.g. 20" required />
          </div>
          <div className="col-12">
            <label className="form-label">Unit</label>
            <input
              type="text"
              name="unit"
              className="form-control"
              value={goal.unit}
              onChange={handleChange}
              placeholder="e.g. km, steps, reps"
              required
            />
          </div>
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-success">Add Goal</button>
          </div>
        </form>
        <div className="card shadow mx-auto" style={{maxWidth: 600}}>
          <div className="card-body">
            <h5 className="card-title">Current Goals</h5>
            <ul className="list-group">
              {goals.length === 0 ? (
                <li className="list-group-item text-muted">No goals yet!</li>
              ) : (
                goals.map((g, i) => (
                  <li key={i} className="list-group-item">
                    <span className="fw-bold">{g.description}</span>
                    <div className="progress my-2" style={{height: "8px"}}>
                      <div className="progress-bar" role="progressbar"
                        style={{width: `${(g.current/g.target)*100}%`}}
                        aria-valuenow={g.current} aria-valuemin={0} aria-valuemax={g.target}>
                      </div>
                    </div>
                    <span className="small text-muted">{g.current} / {g.target} {g.unit}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}