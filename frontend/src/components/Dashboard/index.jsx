import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import { getNotes, createNote, deleteNote } from "../services/api";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", status: "active" });
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("jwt");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const fetchNotes = useCallback(async () => {
    const data = await getNotes(token, { search });
    setNotes(data);
  }, [token, search]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createNote(token, form);
    setForm({ title: "", content: "", status: "active" });
    fetchNotes();
    setMsg("Note added!");
  };

  const handleDelete = async (id) => {
    await deleteNote(token, id);
    fetchNotes();
    setMsg("Note deleted!");
  };

  const goToProfile = () => {
    navigate("/profile"); // ✅ Navigate to Profile component
  };

  return (
    <div className="container mt-4">
      {/* 🔹 Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard</h2>
        <button className="btn btn-secondary" onClick={goToProfile}>
          Go to Profile
        </button>
      </div>

      {/* 🔹 Create Note Form */}
      <form onSubmit={handleCreate} className="mb-3 d-flex gap-2">
        <input
          className="form-control"
          placeholder="Title"
          value={form.title}
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="form-control"
          placeholder="Content"
          value={form.content}
          required
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <select
          className="form-select"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

      {/* 🔹 Search Input */}
      <input
        className="form-control mb-3"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔹 Message Alert */}
      {msg && <div className="alert alert-info">{msg}</div>}

      {/* 🔹 Notes List */}
      <ul className="list-group">
        {notes.map((note) => (
          <li
            key={note.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <b>{note.title}</b>: {note.content}{" "}
              <span className="badge bg-secondary ms-2">{note.status}</span>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
