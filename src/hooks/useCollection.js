import { useState, useEffect, useRef } from "react";
import { projectFireStore } from "../firebase/config";

export const useCollection = (collection, _query, order,option) => {
  const [document, setDocument] = useState(null);
  const [isPending,setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;

  useEffect(() => {
    let ref = projectFireStore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if(order&&option){
      ref = ref.orderBy(order,option);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        setIsPending(true);
        let results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocument(results);
        setIsPending(false);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data...");
      }
    );

    //unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, query, order,option]);

  return { document, isPending, error };
};
