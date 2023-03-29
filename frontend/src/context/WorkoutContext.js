import { createContext, useContext, useReducer } from "react";

export const WorkoutContext = createContext();

//reducer func
const workoutsReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SET_WORKOUTS":
      return { workouts: payload };
    case "CREATE_WORKOUT":
      return { workouts: [payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return { workouts: payload };
    default:
      return state;
  }
};

// provider
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

//custom hook to consume contex
export const UseWorkoutContext = () => {
  const ctx = useContext(WorkoutContext);

  if (!ctx) {
    throw new Error("used out of context");
  }

  return ctx;
};
