import { UseWorkoutContext } from "../context/WorkoutContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};
