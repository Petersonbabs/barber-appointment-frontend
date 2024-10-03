import React from "react";
import { useAuthContext } from "../../../context/AuthContext";

const Routes = () => {
  const { authenticated } = useAuthContext();
  return <div>Dashboard</div>;
};

export default Routes;
