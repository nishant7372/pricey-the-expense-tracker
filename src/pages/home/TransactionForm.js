import styles from "./TransactionForm.module.css";

import { useEffect, useRef, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { Fade } from "react-awesome-reveal";

export default function TransactionForm({ uid }) {
  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const transactionNameInput = useRef(null);

  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      transactionName: transactionName,
      amount: Number(amount),
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
    <div className={styles[`form-container`]} spellCheck="false">
      <form className={styles["transaction-form"]} onSubmit={handleSubmit}>
        <Fade>
          <h2>Add Transaction</h2>
          <label>
            <span>Transaction Name:</span>
            <input
              maxLength="25"
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
              min="1.00"
              max="1000000.00"
              step="0.01"
              placeholder="Amount in ₹"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
          </label>
          <label>
            <span>Short Description:</span>
            <textarea
              maxLength="100"
              placeholder="Write a Short Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </label>
          <button className={styles.btn}>Add</button>
        </Fade>
      </form>
    </div>
  );
}
