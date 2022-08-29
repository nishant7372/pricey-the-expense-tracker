import styles from "./TransactionList.module.css";

export default function TransactionList({ document }) {
  return (
    <ul className={styles.container}>
      {document.map((doc) => (
        <li key={doc.id} className={styles.card}>
          <div className={styles.name}>{doc.transactionName}</div>
          <div className={styles.name}>{doc.description}</div>
          <div className={styles["right-section"]}>
            <div className={styles.amount}>₹ {doc.amount}</div>
            <div className={styles["cross"]}>❌</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
