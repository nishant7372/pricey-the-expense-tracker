import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Home.module.css";

import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import { useCollection } from "../../hooks/useCollection";
import { Fade, Slide } from "react-awesome-reveal";
import { useEffect, useState } from "react";
export default function Home() {
  const { user } = useAuthContext();
  const [option, setOption] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const { document, isPending, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    option,
    order
  );

  //sorting by Name
  const sort = (document) => {
    if (option == "transactionName") {
      document.sort((a, b) => {
        return a.transactionName.localeCompare(b.transactionName);
      });
    }
    return document;
  };

  return (
    <div className={styles[`main-container`]}>
      <div className={styles[`transaction-list`]}>
        <Slide triggerOnce direction="down">
          <div className={styles["title-container"]}>
            <div className={styles[`title`]}>
              <div>Transactions:</div>
              <div className={styles["filter"]}>
                <div>
                  <select onChange={handleOptionChange}>
                    <option value="createdAt">Date</option>
                    <option value="transactionName">Name</option>
                    <option value="amount">Amount</option>
                  </select>
                </div>
                <div>
                  <select onChange={handleOrderChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        {isPending && <div>Loading Transactions...</div>}
        {error && <div>{error}</div>}
        <Fade>{document && <TransactionList document={sort(document)} />}</Fade>
      </div>
      <div className={styles[`transaction-form`]}>
        <Fade>
          <TransactionForm uid={user.uid} />
        </Fade>
      </div>
    </div>
  );
}
