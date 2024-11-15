import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import auth from "../../firebase/firebase.config";
import { setUser, toggleLoadin } from "../../redux/features/userSlice";

const PrivateRoute = ({ children }) => {
  const { email, isLoading } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  // storing the state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        dispatch(
          setUser({
            name: currentUser.displayName,
            email: currentUser.email,
          })
        );
        dispatch(toggleLoadin(false));
      } else {
        dispatch(toggleLoadin(false));
      }
    });
  }, [dispatch]);

  if (email) {
    return children;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
