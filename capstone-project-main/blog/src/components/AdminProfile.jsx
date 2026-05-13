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

      console.log("Users:", res.data);

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

      console.log("Authors:", res.data);

      setAuthors(res.data.payload || []);
    } catch (err) {
      console.log(err);
    }
  };

  // BLOCK USER
  const blockUser = async (id) => {
    try {
      const res = await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/user/block/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      alert("User Blocked");

      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // ACTIVATE USER
  const activateUser = async (id) => {
    try {
      const res = await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/user/activate/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      alert("User Activated");

      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // BLOCK AUTHOR
  const blockAuthor = async (id) => {
    try {
      const res = await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/author/block/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      alert("Author Blocked");

      getAuthors();
    } catch (err) {
      console.log(err);
    }
  };

  // ACTIVATE AUTHOR
  const activateAuthor = async (id) => {
    try {
      const res = await axios.put(
        `https://capstone-backend-tx3g.onrender.com/admin-api/author/activate/${id}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data);

      alert("Author Activated");

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
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      
      <h1 className="text-5xl font-black text-center mb-14">
        Admin Dashboard
      </h1>

      {/* USERS */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Users
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-400">No users found</p>
        ) : (
          <div className="grid gap-5">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-[#1e293b] border border-white/10 rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-medium text-white">
                    {u.email}
                  </p>

                  <p
                    className={`text-sm mt-1 ${
                      u.isUserActive
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {u.isUserActive ? "Active" : "Blocked"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => blockUser(u._id)}
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition"
                  >
                    Block
                  </button>

                  <button
                    onClick={() => activateUser(u._id)}
                    className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold transition"
                  >
                    Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AUTHORS */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Authors
        </h2>

        {authors.length === 0 ? (
          <p className="text-gray-400">No authors found</p>
        ) : (
          <div className="grid gap-5">
            {authors.map((a) => (
              <div
                key={a._id}
                className="bg-[#1e293b] border border-white/10 rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-medium text-white">
                    {a.email}
                  </p>

                  <p
                    className={`text-sm mt-1 ${
                      a.isUserActive
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {a.isUserActive ? "Active" : "Blocked"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => blockAuthor(a._id)}
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition"
                  >
                    Block
                  </button>

                  <button
                    onClick={() => activateAuthor(a._id)}
                    className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold transition"
                  >
                    Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;
