import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../Firebase/Config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../redux/actions";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, nombre, apellido, photoURL } = user;
      dispatch(login({ uid, email, nombre, apellido, photoURL }));
    });
  }, []);

  return status;
};
