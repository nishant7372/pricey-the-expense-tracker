import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import styles from "./TransactionList.module.css";
import { Slide } from "react-awesome-reveal";
import { useFirestore } from "../../hooks/useFirestore";
import { keyframes } from "@emotion/react";

export default function TransactionList({ document }) {
  const [showIndex, setShowIndex] = useState(-1);
  const { deleteDocument } = useFirestore("transactions");
  const handleClick = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const customAnimation1 = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0px, -60px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

  const customAnimation2 = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0,-20px,-20px);
  }

  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;
  return (
    <ul
      className={`
    ${styles[`container`]} ${
        styles[document.length === 0 ? `no-padding` : ``]
      }`}
    >
      {document.map((doc, index) => (
        <Slide cascade key={doc.id} keyframes={customAnimation2}>
          <li key={doc.id}>
            <div
              className={`
                ${styles[`card`]} ${
                styles[showIndex !== index ? `card-border` : `card-noborder`]
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={styles.name}>{doc.transactionName}</div>
              <div className={styles["right-section"]}>
                <div className={styles.amount}>₹ {doc.amount}</div>
                <div
                  className={styles["cross"]}
                  onClick={() => deleteDocument(doc.id)}
                >
                  ❌
                </div>
              </div>
            </div>
            {showIndex === index && (
              <Slide
                direction="down"
                triggerOnce
                className={styles["lower-section"]}
                keyframes={customAnimation1}
              >
                <div>
                  <TransactionDetails description={doc.description} />
                </div>
              </Slide>
            )}
          </li>
        </Slide>
      ))}
    </ul>
  );
}
