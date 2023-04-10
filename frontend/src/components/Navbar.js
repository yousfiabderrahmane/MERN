import { Link } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {
  const { user } = UseAuthContext();
  const { logout } = useLogout();

  console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workout Tracker</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleLogout}>Log out</button>
          </div>
          <div>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
