import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="topbar">
      <div className="user">
        Welcome, Admin
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;