import { useState } from "react";
import styles from "./LogIn.module.css";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("password");

  const showPassword = () => {
    console.log(passwordType);
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className={styles[`form-container`]}>
      <form className={styles["login-form"]}>
        <h2>LogIn</h2>
        <label>
          <span>Email</span>
          <input type="email" placeholder="Email" />
        </label>
        <label>
          <span>Password</span>
          <div className={styles["password-field"]}>
            <input type={passwordType} placeholder="Password" />
            <div className={styles["img"]}>
              <img
                src={require(`../../img/eye-${passwordType}.png`)}
                onClick={showPassword}
              />
            </div>
          </div>
        </label>
        <button>LogIn</button>
      </form>
    </div>
  );
}
