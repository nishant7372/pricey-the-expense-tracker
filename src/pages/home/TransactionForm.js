import styles from "./TransactionForm.module.css";

import { useEffect, useRef, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const transactionNameInput = useRef(null);

  const { addDocument, response } = useFirestore("transactions");

  const parseAmount = (amount) => {
    if (amount.indexOf(".") == -1) {
      return amount + ".00";
    } else if (amount.indexOf(".") == amount.length - 2) {
      return amount + "0";
    } else {
      return (
        amount.substring(0, amount.indexOf(".")) +
        amount.substring(amount.indexOf("."), amount.indexOf(".") + 3)
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      transactionName: transactionName,
      amount: parseAmount(amount),
      description: description,
      uid: uid,
    });
  };

  useEffect(() => {
    console.log(response);
    if (response.success == true) {
      setAmount("");
      setTransactionName("");
      setDescription("");
      transactionNameInput.current.focus();
    }
  }, [response.success]);

  return (
    <div className={styles[`form-container`]} spellcheck="false">
      <form className={styles["transaction-form"]} onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>
        <label>
          <span>Transaction Name:</span>
          <input
            type="text"
            placeholder="Transaction Name"
            onChange={(e) => setTransactionName(e.target.value)}
            value={transactionName}
            ref={transactionNameInput}
            required
          />
        </label>
        <label className={styles.lastLabel}>
          <span>Amount (₹):</span>
          <input
            type="number"
            min="0.00"
            max="1000000.00"
            step="0.01"
            placeholder="Amount in ₹"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </label>
        <label>
          <span>Small Description:</span>
          <textarea
            maxlength="100"
            placeholder="Write a Small Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>
        {/* {error && <div className={styles.error}>{parseError(error)}</div>}
        {isPending && (
          <button className={`${styles["btn"]} ${styles["disabled"]}`} disabled>
            Adding Transaction...
          </button>
        )}
        {!isPending && <button className={styles.btn}>Add</button>} */}
        <button className={styles.btn}>Add</button>
      </form>
    </div>
  );
}
