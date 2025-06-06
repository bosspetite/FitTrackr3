import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


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
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setGoals(data.goals || []);
        } else {
          console.error("Failed to fetch goals:", data.message);
        }
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    }
    fetchGoals();
  }, []);

  const handleChange = (e) =>
    setGoal({ ...goal, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    const { description, target, unit } = goal;
    if (!description || !target || !unit) {
      setMsg("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goal),
      });
      const data = await res.json();

      if (res.ok) {
        setGoals([...goals, data.goal]);
        setGoal({ description: "", target: "", unit: "" });
        setSuccess(true);
        setMsg("Goal added!");
      } else {
        setMsg(data.message || "Failed to add goal.");
      }
    } catch (err) {
      console.error("Error adding goal:", err);
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold text-success text-center">Your Goals</h2>

        {msg && (
          <div
            className={`alert ${success ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {msg}
          </div>
        )}

        <form
          className="row g-3 mb-5 justify-content-center"
          style={{ maxWidth: 500, margin: "0 auto" }}
          onSubmit=
