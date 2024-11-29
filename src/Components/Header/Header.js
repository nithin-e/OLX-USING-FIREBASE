import React, { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/firebaseContest";
import { getAuth,signOut } from 'firebase/auth';
import { FirebaseContext } from '../../store/firebaseContest';
import { Link, useHistory } from 'react-router-dom';  




function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth(firebase); 
  const history = useHistory();

  const LOGOUT = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        history.push('Login')
      })
      .catch((error) => {
        console.error("Error signing out: ", error.message);
      });
  };


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName : "Login"}</span>
          <hr />
        </div>
       {user&&<span onClick={LOGOUT}>LOGOUT</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
