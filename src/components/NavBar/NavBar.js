import styles from "./NavBar.module.css";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function NavBar() {
  const navColors = ["blue", "magenta", "orangered", "green"];
  const [index, setIndex] = useState(0);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        return prevIndex == navColors.length - 1 ? 0 : prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const parseUserName = (name) => {
    if (name.indexOf(" ") != -1) return name.substring(0, name.indexOf(" "));
    else return name;
  };

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
          {!user && (
            <>
              <NavLink className={`font-${navColors[index]}`} to="/login">
                LogIn
              </NavLink>
              <NavLink className={`font-${navColors[index]}`} to="/signup">
                SignUp
              </NavLink>
            </>
          )}
          {user && (
            <>
              <div className={styles.userName}>
                Hello, {parseUserName(user.displayName)}
              </div>
              <div
                className={`${styles[`btn`]} font-${navColors[index]}`}
                onClick={logout}
              >
                LogOut
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
