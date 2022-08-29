import styles from "./TransactionDetails.module.css";

export default function TransactionDetails({ description }) {
  return <div className={styles["description-box"]}>{description}</div>;
}
