import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);

  // GET USERS
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://capstone-backend-tx3g.onrender.com/admin-api/users",
        { withCredentials: true }
      );

      setUsers(res.data.payload || []);
    } catch (err) {
      console.log(err);
    }
  };

  // GET AUTHORS
  const getAuthors = async () => {
    try {
      const res = await axios.get(
        "https://capstone-backend-tx3g.onrender.com/admin-api/authors",
        { withCredentials: true }
      );

      setAuthors(res.data.payload || []);
    } catch (err) {
      console.log(err);
    }
  };

  // BLOCK USER
  const blockUser = async (id) => {
    try {
      await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/user/block/${id}`,
        {},
        { withCredentials: true }
      );

      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // ACTIVATE USER
  const activateUser = async (id) => {
    try {
      await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/user/activate/${id}`,
        {},
        { withCredentials: true }
      );

      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // BLOCK AUTHOR
  const blockAuthor = async (id) => {
    try {
      await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/author/block/${id}`,
        {},
        { withCredentials: true }
      );

      getAuthors();
    } catch (err) {
      console.log(err);
    }
  };

  // ACTIVATE AUTHOR
  const activateAuthor = async (id) => {
    try {
      await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/author/activate/${id}`,
        {},
        { withCredentials: true }
      );

      getAuthors();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getAuthors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      
      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* USERS */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">
          Users
        </h2>

        <div className="grid gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
            >
              <p>{u.email}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => blockUser(u._id)}
                  className="bg-red-500 px-4 py-2 rounded-lg"
                >
                  Block
                </button>

                <button
                  onClick={() => activateUser(u._id)}
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  Activate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AUTHORS */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Authors
        </h2>

        <div className="grid gap-4">
          {authors.map((a) => (
            <div
              key={a._id}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
            >
              <p>{a.email}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => blockAuthor(a._id)}
                  className="bg-red-500 px-4 py-2 rounded-lg"
                >
                  Block
                </button>

                <button
                  onClick={() => activateAuthor(a._id)}
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  Activate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
