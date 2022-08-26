import { useState } from "react";
import { projectAuth } from "../../src/firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, name) => {
    setError(null);
    setIsPending(true);

    try {
      //user sign up with email and password

      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("could not complete signup");
      }

      //add display name to user

      await response.user.updateProfile({ displayName: name });

      //dispatch login action

      dispatch({ type: "LOGIN", payload: response.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
