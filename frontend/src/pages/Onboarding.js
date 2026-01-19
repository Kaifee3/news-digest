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
    <div>
      <h2>Choose Interests</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />

      {["AI", "Tech", "Sports"].map(i => (
        <label key={i}>
          <input type="checkbox" onChange={() => toggleInterest(i)} /> {i}
        </label>
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
}
