import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import ReadingMode from "./pages/ReadingMode";
import SubmitArticle from "./pages/SubmitArticle";
import { loadReadSeconds } from "./utils/storage";

const App = () => {
  const [totalSeconds, setTotalSeconds] = useState(loadReadSeconds());
  const location = useLocation();
  const showNav = !location.pathname.startsWith("/read/");

  return (
    <div className="app-shell min-h-screen bg-ink text-parchment">

      {/* 🔥 DEPLOYMENT TEST BANNER */}
      <div className="w-full bg-red-600 text-white text-center py-3 text-xl font-bold tracking-wide">
        🚀 TEST VERSION ACTIVE 🚀
      </div>

      {showNav && <Navbar totalSeconds={totalSeconds} />}

      <Routes>
        <Route
          path="/"
          element={<Home onTotalSecondsChange={setTotalSeconds} />}
        />
        <Route path="/read/:id" element={<ReadingMode />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/submit" element={<SubmitArticle />} />
      </Routes>
    </div>
  );
};

export default App;
