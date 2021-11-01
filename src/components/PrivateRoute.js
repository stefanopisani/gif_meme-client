import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PrivateRoute({ component, ...options }) {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLoggedIn() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/isloggedin`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data._id);
      if (response.data._id) {
        setLoggedInUser(true);
        setIsLoading(false);
      } else {
        setLoggedInUser(false);
        setIsLoading(false);
        toast.warning("You need to login to proceed❗️❗️❗️");
      }
    }
    checkLoggedIn();
    console.log({ isLoading, loggedInUser });
  }, [setIsLoading]);

  return (
    <>
      {!isLoading && (
        <>
          {loggedInUser ? (
            <Route {...options} component={component} />
          ) : (
            <Redirect to="/login" />
          )}
        </>
      )}
    </>
  );

  // isLoading ? null : loggedInUser ? (
  //   <Route {...options} component={component} />
  // ) : (
  //   <Redirect to="/login" />
  // );
}

export default PrivateRoute;
