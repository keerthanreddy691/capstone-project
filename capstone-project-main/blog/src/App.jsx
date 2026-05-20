import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./store/authStore";

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AuthorProfile from "./components/AuthorProfile";
import AuthorArticles from "./components/AuthorArticles";
import EditArticle from "./components/EditArticle";
import WriteArticles from "./components/WriteArticles";
import ArticleByID from "./components/ArticleByID";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProfile from "./components/AdminProfile";

function App() {
  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Home /> },

        { path: "register", element: <Register /> },

        { path: "login", element: <Login /> },

        // USER ROUTE
        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },

        // AUTHOR ROUTES
        {
          path: "author-profile",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <AuthorProfile />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <AuthorArticles /> },
            { path: "articles", element: <AuthorArticles /> },
            { path: "write-article", element: <WriteArticles /> },
          ],
        },

        // ADMIN ROUTE
        {
          path: "admin-profile",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminProfile />
            </ProtectedRoute>
          ),
        },

        // ARTICLE VIEW
        {
          path: "article/:id",
          element: (
            <ProtectedRoute allowedRoles={["USER", "AUTHOR"]}>
              <ArticleByID />
            </ProtectedRoute>
          ),
        },

        // EDIT ARTICLE
        {
          path: "edit-article",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          ),
        },

        { path: "unauthorized", element: <Unauthorized /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;
