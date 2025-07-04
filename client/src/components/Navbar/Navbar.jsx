import "./Navbar.css";

const Navbar = () => {

  return (
    <div className="topbar">
      <div className="user">
        Welcome,  
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;