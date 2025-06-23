import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [voice, setVoice] = useState('Rasta Voice');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitPrompt = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, voice })
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h1>MzanziVid 🎬</h1>

      <label style={{ display: 'block', marginTop: 20 }}>Scene Prompt:</label>
      <textarea
        rows={4}
        style={{ width: '100%', padding: 10 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. A baboon hijacking a minibus taxi"
      />

      <label style={{ display: 'block', marginTop: 20 }}>Select Voice:</label>
      <select
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        style={{ padding: 10, width: '100%' }}
      >
        <option value="Rasta Voice">Rasta Voice</option>
        <option value="Township Ous Voice">Township Ous Voice</option>
        <option value="Narrator Voice">Narrator Voice</option>
      </select>

      <button
        onClick={submitPrompt}
        style={{ marginTop: 20, padding: 15, width: '100%', background: '#111', color: '#fff', border: 'none', fontWeight: 'bold' }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Video'}
      </button>

      {response && (
        <div style={{ marginTop: 30, padding: 15, background: '#eee' }}>
          <strong>Response:</strong> <p>{response}</p>
        </div>
      )}
    </main>
  );
}
