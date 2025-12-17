import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {

  const {user, logout} = useAuth();


  return (
    <div className="topbar">
      <div className="user">
        Welcome, {user.name}
        <button className="logout-btn" onClick={logout} >Logout</button>
      </div>
    </div>
  );
};

export default Navbar;