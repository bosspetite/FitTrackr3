import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({ type: "", duration: "", note: "" });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Load activities from backend on mount
  useEffect(() => {
    async function fetchActivities() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/activities`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setActivities(data.activities || []);
      } catch {
        // Could show an error here if you want
      }
    }
    fetchActivities();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    if (!form.type || !form.duration) {
      setMsg("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        setActivities([data.activity, ...activities]);
        setForm({ type: "", duration: "", note: "" });
        setSuccess(true);
        setMsg("Activity logged!");
      } else {
        setMsg(data.message || "Failed to log activity.");
      }
    } catch (error) {
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold text-primary text-center">Log New Activity</h2>
        {msg && (
          <div className={`alert ${success ? "alert-success" : "alert-danger"}`} role="alert">
            {msg}
          </div>
        )}
        <form className="row g-3 mb-5 justify-content-center" style={{maxWidth: 500, margin: "0 auto"}} onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Activity Type</label>
            <select name="type" className="form-select" value={form.type} onChange={handleChange} required>
              <option value="">Select activity</option>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Gym">Gym</option>
              <option value="Yoga">Yoga</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Duration (minutes)</label>
            <input type="number" name="duration" min={1} className="form-control" value={form.duration} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Note <span className="text-muted">(optional)</span></label>
            <textarea name="note" rows={2} className="form-control" value={form.note} onChange={handleChange} placeholder="How did you feel? Any details..." />
          </div>
          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-primary">Log Activity</button>
          </div>
        </form>
        <div className="card shadow mx-auto" style={{maxWidth: 600}}>
          <div className="card-body">
            <h5 className="card-title">Recent Activities</h5>
            <ul className="list-group">
              {activities.length === 0 ? (
                <li className="list-group-item text-muted">No activities yet!</li>
              ) : (
                activities.map((a, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{a.type} <span className="text-muted small">({a.duration} min)</span></span>
                    <span className="text-secondary small">{a.note}</span>
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