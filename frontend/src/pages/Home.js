import { useEffect, useState } from "react";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { Form } from "../components/Form";

export const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    //we declared the proxy in the packagejson so now we dont have to use it explicitly only works in deplyomenet
    const response = await fetch("/api/workouts");

    if (response.ok) {
      const data = await response.json();

      setWorkouts(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <Form />
    </div>
  );
};
