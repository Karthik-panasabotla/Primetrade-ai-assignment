import BASE_URL from "../apiConfig";

const API = `${BASE_URL}`;

export async function login(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function signup(data) {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getNotes(token, params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/notes?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createNote(token, note) {
  const res = await fetch(`${API}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(`${API}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateProfile(token, profile) {
  const res = await fetch(`${API}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });
  return res.json();
}
