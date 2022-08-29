import { useState, useEffect } from "react";
import { projectFireStore } from "../firebase/config";

export const useCollection = (collection) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFireStore.collection(collection);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocument(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data...");
      }
    );

    //unsubscribe on unmount
    return () => unsubscribe();
  }, [collection]);

  return { document, error };
};
