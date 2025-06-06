import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", avatar: "" });
  const [editMsg, setEditMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user from backend on mount
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setEditForm({
            name: data.user.name,
            email: data.user.email,
            avatar: data.user.avatar || "",
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setShowEdit(false);
        setEditMsg("Profile updated!");
        setTimeout(() => setEditMsg(""), 2000);
      } else {
        setEditMsg(data.message || "Profile update failed.");
      }
    } catch {
      setEditMsg("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/profile`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      // Regardless of backend response, log out
      localStorage.removeItem("token");
      setShowDelete(false);
      navigate("/login");
    } catch {
      localStorage.removeItem("token");
      setShowDelete(false);
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavBar />
        <div className="container py-5 text-center">
          <div className="alert alert-danger">Could not load profile. Please log in again.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow">
              <div className="card-body text-center">
               <img src={user.avatar || "https://i.pravatar.cc/150?img=47"} alt="avatar" className="rounded-circle mb-3 border border-3 border-primary" width={120} height={120} />
                <h3 className="fw-bold mb-2">{user.name}</h3>
                <div className="mb-2 text-muted">{user.email}</div>
                <div className="mb-3">Member since: {user.memberSince ? new Date(user.memberSince).toLocaleDateString() : "N/A"}</div>
                {editMsg && <div className="alert alert-success py-1">{editMsg}</div>}
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => { setEditForm(user); setShowEdit(true); }}>Edit Profile</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => setShowDelete(true)}>Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowEdit(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" value={editForm.name} onChange={handleEditChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" className="form-control" name="email" value={editForm.email} onChange={handleEditChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Avatar URL</label>
                  <input type="text" className="form-control" name="avatar" value={editForm.avatar} onChange={handleEditChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEdit(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDelete && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Delete Account</h5>
                <button type="button" className="btn-close" onClick={() => setShowDelete(false)}></button>
              </div>
              <div className="modal-body text-center">
                <p className="mb-3"><strong>Are you sure you want to delete your account?</strong></p>
                <p className="text-muted small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDelete(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}