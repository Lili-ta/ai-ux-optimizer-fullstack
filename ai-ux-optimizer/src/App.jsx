import React, { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAnalyze = async () => {
    setFeedback("Analyzing...");

    try {
      const res = await fetch(`http://localhost:3001/analyze?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setFeedback(data.suggestions);
    } catch (err) {
      console.error(err);
      setFeedback("Failed to analyze the page.");
    }
  };

  return (
    <div className="app-container">
      <h1>AI UX Optimizer</h1>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze UI/UX</button>
      <pre>{feedback}</pre>
    </div>
  );
}