import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Home.module.css";

import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const { document, error } = useCollection("transactions");
  const { user } = useAuthContext();
  return (
    <div className={styles[`main-container`]}>
      <div className={styles[`transaction-list`]}>
        {error && <div>{error}</div>}
        {document && <TransactionList document={document} />}
      </div>
      <div className={styles[`transaction-form`]}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
