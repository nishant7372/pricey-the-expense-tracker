import { useState } from "react";
import { projectAuth } from "../../src/firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //user sign out

      await projectAuth.signOut();

      //dispatch logout action

      dispatch({ type: "LOGOUT" });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
