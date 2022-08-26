import styles from "./NavBar.module.css";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const navColors = ["blue", "magenta", "orangered", "green"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        return prevIndex == navColors.length - 1 ? 0 : prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles["nav-container"]} ${navColors[index]} ${styles.sticky}`}
    >
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          <img src={require("../../img/logo.png")} />
          <div className={styles.name}>Pricey</div>
        </div>
        <div className={styles["rightSection"]}>
          <NavLink className={`font-${navColors[index]}`} to="/">
            Home
          </NavLink>
          <NavLink className={`font-${navColors[index]}`} to="/login">
            LogIn
          </NavLink>
          <NavLink className={`font-${navColors[index]}`} to="/signup">
            SignUp
          </NavLink>
        </div>
      </div>
    </div>
  );
}
