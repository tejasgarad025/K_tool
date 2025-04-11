import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import useAuth from "./useAuth";
import POS_Tagging from "./pos_tagging";
import NER from "./NER";
import SA from "./SA";
import POS_Tagging_server from "./pos_tagging_server";

function HomePage() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("POS_Tagging"); // Default to POS_Tagging

  // Handler to update selected page
  const handlePage = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <div className="container">
      <Header />
      <MainContent selectedPage={selectedPage} handlePage={handlePage} />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    alert("Logging out");
    navigate("/loginX");
  };

  return (
    <header className="header">
      <nav className="nav-links">
        <a href="/home">Home</a>
        <a href="/about">About Us</a>
        <a href="/performance">Performance</a>
        <a href="#">Report Bug</a>
        <a href="/home">Refresh</a>
      </nav>
      <div className="logout-button" onClick={HandleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logout-icon"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </div>
    </header>
  );
}

function MainContent({ selectedPage, handlePage }) {
  return (
    <main className="main-content">
      <Method handlePage={handlePage} />
      <UserInfo />
      <DynamicComponent selectedPage={selectedPage} />
    </main>
  );
}

function UserInfo() {
  const user = useAuth();
  return (
    <div>
      {user ? (
        <p className="current-user">
          <b>Current user:</b> {user.full_name ? user.full_name : "not available"}
        </p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

function Method({ handlePage }) {
  return (
    <div className="select-section">
      <div>
        <label>Method</label>
        <select onChange={handlePage} defaultValue="POS_Tagging">
          <option value="POS_Tagging">Part Of Speech (POS)</option>
          <option value="POS_Tagging_server">Part Of Speech auto</option>
          <option value="NER">Named Entity Recognition (NER)</option>
          <option value="SA">Sentiment Analysis</option>
        </select>
      </div>
    </div>
  );
}

function DynamicComponent({ selectedPage }) {
  switch (selectedPage) {
    case "POS_Tagging":
      return <POS_Tagging />;
    case "POS_Tagging_server":
      return <POS_Tagging_server />;  
    case "NER":
      return <NER />;
    case "SA":
      return <SA />;
    default:
      return <POS_Tagging />;
  }
}

export default HomePage;
