import { useState } from "react";
import { projectAuth } from "../../src/firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //user log in

      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //dispatch logout action

      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
