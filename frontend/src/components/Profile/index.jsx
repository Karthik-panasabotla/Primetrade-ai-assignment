import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import { getProfile, updateProfile } from "../services/api";

const Profile = () => {
  const token = localStorage.getItem('jwt');
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    (async () => {
      const data = await getProfile(token);
      setProfile(data);
    })();
  }, [token]);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async e => {
    e.preventDefault();
    const res = await updateProfile(token, profile);
    if (res.message) setMsg(res.message);
    setEdit(false);
  };

  const goBackToDashboard = () => {
    navigate("/dashboard"); // ✅ Navigate to Dashboard
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Profile</h2>
        <button className="btn btn-secondary" onClick={goBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}

      {edit ? (
        <form onSubmit={handleSave}>
          <input
            className="form-control mb-2"
            name="name"
            value={profile.name}
            required
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            value={profile.email}
            required
            onChange={handleChange}
          />
          <button className="btn btn-success me-2" type="submit">
            Save
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <button className="btn btn-primary" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
