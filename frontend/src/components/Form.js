import { useState } from "react";

export const Form = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(0);
  const [load, setLoad] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      console.log("New workout added", json);
      //reset form
      setTitle("");
      setLoad(0);
      setReps(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Workout</h3>
      <label>Exersice title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(Number(e.target.value))}
        value={load}
      />
      <label>Number of reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(Number(e.target.value))}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
