function App() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <h1>GitHub Analyzer</h1>

      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
}

export default App;