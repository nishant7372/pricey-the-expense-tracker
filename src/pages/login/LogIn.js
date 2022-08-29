import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./LogIn.module.css";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isPending } = useLogin();

  const parseError = (error) => {
    if (
      error.indexOf("no user record") >= 0 ||
      error.indexOf("password") >= 0
    ) {
      return "⚠️ Incorrect Email or Password";
    } else {
      return "⚠️" + error;
    }
  };

  const showPassword = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles[`form-container`]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        spellcheck="false"
      >
        <h2>LogIn</h2>
        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            autoFocus
          />
        </label>
        <label className={styles.lastLabel}>
          <span>Password</span>
          <div className={styles["password-field"]}>
            <input
              type={passwordType}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className={styles["img"]}>
              <img
                src={require(`../../img/eye-${passwordType}.png`)}
                onClick={showPassword}
              />
            </div>
          </div>
        </label>
        {error && <div className={styles.error}>{parseError(error)}</div>}
        {isPending && (
          <button className={`${styles["btn"]} ${styles["disabled"]}`} disabled>
            Signing in...
          </button>
        )}
        {!isPending && <button className={styles.btn}>LogIn</button>}
      </form>
    </div>
  );
}
