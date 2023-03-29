import { UseWorkoutContext } from "../context/WorkoutContext";

export const WorkoutDetails = ({ workout }) => {
  const { workouts, dispatch } = UseWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log("successfully deleted");
      const newWorkouts = workouts.filter((i) => i._id !== workout._id);

      dispatch({ type: "DELETE_WORKOUT", payload: newWorkouts });
    } else {
      console.log(json.msg);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleDelete}>delete me</span>
    </div>
  );
};
