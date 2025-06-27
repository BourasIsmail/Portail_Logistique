import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children, roles }) => {
  const [destination, setDestination] = useState(<></>);
  const [autorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const { userDetails } = useAuth();

  useEffect(() => {
    let authorized = true;

    if (userDetails == null) {
      authorized = false;
      setDestination({});
      return navigate("/login");
    }

    try {
      if (roles && !roles.includes(userDetails.role)) {
        authorized = false;
        setDestination({});
        return navigate("/notfound", { state: { from: "ProtectedRoute" } });
      }
    } catch (e) {
      console.warn(e);

      authorized = false;
      setDestination({});
      return navigate("/login");
    }

    if (authorized) {
      setAuthorized(authorized);
      setDestination(<>{children}</>);
    }
  }, []);

  if (autorized) {
    return destination;
  }
};

export default ProtectedRoute;
