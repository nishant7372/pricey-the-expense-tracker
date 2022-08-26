import { useState } from "react";
import styles from "./SignUp.module.css";
import { useSignup } from "../../hooks/useSignup";

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isPending } = useSignup();

  const showPassword = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, name);
  };

  return (
    <div className={styles[`form-container`]}>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <label>
          <span>Name</span>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
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
        {error && <div>{error}</div>}
        {isPending && (
          <button className={`${styles["btn"]} ${styles["disabled"]}`} disabled>
            Creating Account...
          </button>
        )}
        {!isPending && <button className={styles.btn}>SignUp</button>}
      </form>
    </div>
  );
}
