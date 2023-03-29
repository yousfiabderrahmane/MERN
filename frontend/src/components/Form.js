import { useState } from "react";
import { UseWorkoutContext } from "../context/WorkoutContext";

export const Form = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = UseWorkoutContext();

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
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setEmptyFields([]);
      console.log("New workout added", json);
      //reset form
      setTitle("");
      setLoad(0);
      setReps(0);
      dispatch({ type: "CREATE_WORKOUT", payload: json.newWorkout });
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
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(Number(e.target.value))}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Number of reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(Number(e.target.value))}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
