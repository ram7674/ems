import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

  const {user} = useAuth();


  return (
    <div className="topbar">
      <div className="user">
        Welcome, {user.name}
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;