import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // GET ARTICLES
  async function getArticles() {
    try {
      const res = await axios.get(
        "https://capstone-backend-tx3g.onrender.com/user-api/articles",
        {
          withCredentials: true,
        }
      );

      setArticles(res.data.payload || []);
    } catch (err) {
      console.log(err);
    }
  }

  // CHECK AUTH
  async function checkAuth() {
    try {
      await axios.get(
        "https://capstone-backend-tx3g.onrender.com/auth-api/check-auth",
        {
          withCredentials: true,
        }
      );

      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  }

  // HANDLE BUTTON CLICK
  async function handleStart() {
    if (isLoggedIn) {
      navigate("/articles");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    getArticles();
    checkAuth();
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col justify-between">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            Read.
            <span className="text-cyan-400"> Learn.</span>
            Create.
          </h1>

          <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
            Explore modern blogs and developer articles from creators around the world.
          </p>

          {!isLoggedIn && (
            <button
              onClick={handleStart}
              className="mt-10 bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
            >
              Get Started
            </button>
          )}
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20 w-full">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Latest Articles</h2>

          <div className="h-[2px] bg-cyan-400 w-20 rounded"></div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No Articles Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => (
             <div
  key={article._id}
  onClick={() =>
    navigate(`/article/${article._id}`, {
      state: article,
    })
  }
  className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] transition duration-300"
>
                <img
                  src={
                    article.image ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                  }
                  alt=""
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">
                    {article.title}
                  </h3>

                  <p className="text-gray-300 line-clamp-3">
                    {article.content}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-cyan-400">
                      {article.category || "Technology"}
                    </span>

                    <span className="text-sm text-gray-400">
                      {new Date(
                        article.dateOfModification
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Home;
