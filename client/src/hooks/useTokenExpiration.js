import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const expirationDate = jwtDecode(token).exp * 1000; // Convert to milliseconds
        if (Date.now() > expirationDate) {
          // Token has expired, perform logout
          dispatch({ type: "LOGOUT", payload: null });
          // Redirect to the landing page
          navigate("/");
        }
      }
    };

    // Run the check on mount and on token change
    checkTokenExpiration();

    // Set up an interval to periodically check the token expiration
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [token, dispatch, navigate]);

  return null;
};

export default useTokenExpiration;
