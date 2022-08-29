import { useEffect, useState } from "react";
import TransactionDetails from "./TransactionDetails";
import styles from "./TransactionList.module.css";
import { Fade, Slide } from "react-awesome-reveal";

export default function TransactionList({ document }) {
  const [showIndex, setShowIndex] = useState(-1);

  const handleClick = (index) => {
    setShowIndex((prevIndex) => (prevIndex == index ? -1 : index));
  };

  useEffect(() => {});

  return (
    <ul className={styles.container}>
      {document.map((doc, index) => (
        <Fade cascade key={doc.id}>
          <li key={doc.id}>
            <div
              className={`
                ${styles[`card`]} ${
                styles[showIndex != index ? `card-border` : `card-noborder`]
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={styles.name}>{doc.transactionName}</div>
              <div className={styles["right-section"]}>
                <div className={styles.amount}>₹ {doc.amount}</div>
                <div className={styles["cross"]}>❌</div>
              </div>
            </div>
            {showIndex == index && (
              <Slide
                direction="down"
                triggerOnce
                duration={500}
                className={styles["lower-section"]}
              >
                <div>
                  <TransactionDetails description={doc.description} />
                </div>
              </Slide>
            )}
          </li>
        </Fade>
      ))}
    </ul>
  );
}
