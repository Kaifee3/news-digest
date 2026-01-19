import { api } from "../api";
import { useState } from "react";

export default function Digest() {
  const [email, setEmail] = useState("");
  const [digest, setDigest] = useState("");
  const [interests, setInterests] = useState([]);
  const [personalized, setPersonalized] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadDigest = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.get(`/news/digest/${email}`);
      setDigest(res.data.digest);
      setInterests(res.data.interests || []);
      setPersonalized(res.data.personalized || false);
    } catch (error) {
      console.error('Error loading digest:', error);
      alert("Error loading digest. Please make sure the user is registered and the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Your Daily Digest</h2>
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Enter your email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={loadDigest} disabled={loading}>
          {loading ? 'Loading...' : 'Get Digest'}
        </button>
      </div>
      
      {interests.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <strong>Your Interests: </strong>
          {interests.join(', ')}
          {personalized && <span style={{ color: 'green', marginLeft: '10px' }}>✓ Personalized</span>}
          {!personalized && <span style={{ color: 'orange', marginLeft: '10px' }}>ⓘ Using general news</span>}
        </div>
      )}
      
      <pre style={{ 
        whiteSpace: 'pre-wrap', 
        fontFamily: 'Arial, sans-serif', 
        lineHeight: '1.6',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        {digest || "Enter your email and click 'Get Digest' to see your personalized news."}
      </pre>
    </div>
  );
}
