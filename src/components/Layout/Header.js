import React from "react";
import mealsImage from "../../assets/meals.jpg";
import style from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={style.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCartHandler} />
      </header>
      <div className={style["main-image"]}>
        <img src={mealsImage} alt="mealsImage"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
