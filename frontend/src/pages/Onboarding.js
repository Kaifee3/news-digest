import { api } from "../api";
import { useState } from "react";

export default function Onboarding() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    interests: []
  });

  const toggleInterest = (i) => {
    setForm({
      ...form,
      interests: form.interests.includes(i)
        ? form.interests.filter(x => x !== i)
        : [...form.interests, i]
    });
  };

  const submit = async () => {
    await api.post("/users/register", form);
    alert("Saved!");
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333' 
      }}>Choose Interests</h2>
      
      <input 
        placeholder="Name" 
        onChange={e => setForm({...form, name: e.target.value})} 
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}
      />
      
      <input 
        placeholder="Email" 
        onChange={e => setForm({...form, email: e.target.value})} 
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}
      />

      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ 
          marginBottom: '15px', 
          color: '#555', 
          fontSize: '18px' 
        }}>Select your interests:</h3>
        
        {["AI", "Tech", "Sports"].map(i => (
          <label key={i} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            <input 
              type="checkbox" 
              onChange={() => toggleInterest(i)} 
              style={{
                marginRight: '10px',
                transform: 'scale(1.2)'
              }}
            /> 
            {i}
          </label>
        ))}
      </div>

      <button 
        onClick={submit}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={e => e.target.style.backgroundColor = '#007bff'}
      >
        Submit
      </button>
    </div>
  );
}
