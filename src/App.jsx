import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import FeedPage from "./components/FeedPage";
import "./App.css";

function App() {
  const AUTH_KEY = "isLoggedIn"; 

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(AUTH_KEY) === "true"
  );

  function handleLogin() {
    localStorage.setItem(AUTH_KEY, "true");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY); 
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {}
      {isLoggedIn ? (
        <FeedPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;

