import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import useAuth from "./useAuth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigate = useNavigate();

  const handlePage = (event) => {
    const selectedPage = event.target.value;
    if (selectedPage) {
      navigate(selectedPage);
    }
  };

  return (
    <div className="container">
      <Header />
      <MainContent handlePage={handlePage} />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    alert("Logginng out");
    navigate("/login");
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

      <div className="logout-button" onClick={() => HandleLogout()}>
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

function MainContent({ handlePage }) {
  return (
    <main className="main-content">
      <Method handlePage={handlePage} />
      <UserInfo />
      <TaggingSection />
    </main>
  );
}

function Method({ handlePage }) {
  return (
    <div className="select-section">
      <div>
        <label>Method</label>
        <select onChange={handlePage}>
          <option value="/home">Part Of Speech (POS)</option>
          <option value="/namedannotation">Named Entity Recognition (NER)</option>
          <option value="/sentimental">Sentimental Analysis</option>
        </select>
      </div>
    </div>
  );
}

function UserInfo() {
  const user = useAuth();

  return (
    <div>
      {user ? (
        <p className="current-user">
          {" "}
          <b>Current user :</b>{" "}
          {user.username ? user.username : "not available"}
        </p>
      ) : (
        <p>not logged in</p>
      )}
    </div>
  );
}

function TaggingSection() {
  const [text, setText] = useState("");
  const [words, setWords] = useState("");

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const handleClearTag = () => {
    setWords([]);
  };

  const handleSplit = () => {
    if(text.trim()){
      setWords(text.trim().split(/\s+/).join("\n"));
    } else {
      setWords("");
    }
};

// const handleWordClick = (word) => {
//   setSelectedWord(word);
// };

// const handleTagSelect = (tag) => {
//   if (selectedWord) {
//     setAnnotations((prevAnnotations) => ({
//       ...prevAnnotations,
//       [selectedWord]: tag.text,
//     }));
//     setSelectedWord(null);
//   }
// };

  const handleSave = () => {
    toast.success("Saved successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="tagging-section">
      {/* <div className="tagging-header">
        <div>
          <label>language</label>
          <select>
            <option>Konkani</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <div>
          <label>Method</label>
          <select>
            <option>CLIFT NER</option> 
            <option>Method 2</option>
          </select>
        </div>
      </div> */}

      <div className="textareas">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter text to annotated"
          className="text-1"
        ></textarea>
        <button className="btn-nxt" onClick={handleSplit}>Next</button>
      </div>

      <div className="textareas-1-2">
        <textarea value={words} className="text-1-2"></textarea>

        <div className="tag-list">
           <TagList />
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleClearTag}>Clear Tag</button>
        <button onClick={handleSave} className="save">Save</button>
      </div>
    </div>
  );
}

function TagList() {
  const tags = [
    { text: "Person", color: "tag-green" },
    { text: "Noun", color: "tag-blue" },
    { text: "Festival", color: "tag-orange" },
    { text: "Language", color: "tag-red" },
    { text: "Religion", color: "tag-teal" },
    { text: "Game", color: "tag-yellow" },
    { text: "Doubt", color: "tag-light-yellow" },
    { text: "Literature", color: "tag-purple" },
    { text: "B-Person", color: "tag-dark-yellow" },
    { text: "B-Noun", color: "tag-dark-blue" },
    { text: "B-Festival", color: "tag-dark-orange" },
    { text: "B-Language", color: "tag-dark-red" },
    { text: "B-Religion", color: "tag-dark-teal" },
    { text: "B-Game", color: "tag-dark-yellow" },
    { text: "Person", color: "tag-green" },
    { text: "Noun", color: "tag-blue" },
    { text: "Festival", color: "tag-orange" },
    { text: "Language", color: "tag-red" },
    { text: "Religion", color: "tag-teal" },
    { text: "Game", color: "tag-yellow" },
    { text: "Doubt", color: "tag-light-yellow" },
    { text: "Literature", color: "tag-purple" },
    { text: "B-Person", color: "tag-dark-yellow" },
    { text: "B-Noun", color: "tag-dark-blue" },
    { text: "B-Festival", color: "tag-dark-orange" },
    { text: "B-Language", color: "tag-dark-red" },
    { text: "B-Religion", color: "tag-dark-teal" },
    { text: "B-Game", color: "tag-dark-yellow" },
  ];

  return (
    <div className="tag-list">
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} 
          className={`tag ${tag.color}`}>
            {tag.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Home;
