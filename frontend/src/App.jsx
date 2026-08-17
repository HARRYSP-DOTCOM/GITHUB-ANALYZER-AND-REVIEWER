import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "GIT.AI";
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <h1>GIT.AI</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
        <button
          onClick={handleGoogleLogin}
          style={{ padding: "12px 24px", fontSize: "16px", cursor: "pointer", borderRadius: "8px", border: "1px solid #ccc", background: "#fff", color: "#333", display: "flex", alignItems: "center", gap: "8px" }}
        >
          Continue with Google
        </button>

        <button
          onClick={handleGithubLogin}
          style={{ padding: "12px 24px", fontSize: "16px", cursor: "pointer", borderRadius: "8px", border: "none", background: "#24292e", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}

export default App;