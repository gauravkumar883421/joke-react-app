
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from "react";



function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = () => {
    setLoading(true);
    setError(null);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch joke");
        return res.json();
      })
      .then((data) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="header">My Joke App</div>
      <div className="main-content">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Random Joke</h1>
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.punchline}</p>

          <button
            onClick={fetchJoke}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Get Another Joke
          </button>
        </div>
      </div>
      <footer style={{
        width: '100%',
        textAlign: 'center',
        padding: '24px 0 16px 0',
        fontSize: '1.1em',
        color: '#444',
        letterSpacing: '1px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        background: 'rgba(255,255,255,0.7)',
        zIndex: 999
      }}>
        Developed and maintained by Gaurav Kumar
      </footer>
    </>
  );
}

export default App;

