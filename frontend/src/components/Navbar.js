import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/sign-up");
  };
  return (
    <div className="nav-heading">
      <ul className="nav-ul">
        <li>
          <Link to={"/"}>Products</Link>
        </li>
        <li>
          <Link to={"/add"}>Add Products</Link>
        </li>
        <li>
          <Link to={"/update"}>Update Products</Link>
        </li>

        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        {auth ? (
          <li>
            <Link onClick={() => logout()} to={"/sign-up"}>
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/sign-up"}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
