import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://capstone-backend-tx3g.onrender.com";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  // LOGIN
  login: async (userCred) => {
    try {
      set({
        loading: true,
        currentUser: null,
        isAuthenticated: false,
        error: null,
      });

      const res = await axios.post(
        `${BASE_URL}/auth-api/login`,
        userCred,
        {
          withCredentials: true,
        }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      console.log("LOGIN RESPONSE:", res.data.payload);
    } catch (err) {
      console.log("Login error:", err);

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error:
          err.response?.data?.message || "Login failed",
      });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await axios.get(
        `${BASE_URL}/auth-api/logout`,
        {
          withCredentials: true,
        }
      );

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.log("Logout error:", err);

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    }
  },

  // RESTORE SESSION AFTER REFRESH
  checkAuth: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await axios.get(
        `${BASE_URL}/auth-api/check-auth`,
        {
          withCredentials: true,
        }
      );

      console.log(
        "CHECK AUTH RESPONSE:",
        res.data.payload
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.log(
        "CHECK AUTH FAILED:",
        err.response?.data || err.message
      );

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    }
  },
}));
