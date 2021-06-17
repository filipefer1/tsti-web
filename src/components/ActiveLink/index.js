import { cloneElement } from "react";
import { Link, useLocation } from "react-router-dom";

export const ActiveLink = ({ children, to = "" }) => {
  const { pathname } = useLocation();

  let isActive = false;

  if (to === pathname) {
    isActive = true;
  }

  return (
    <Link to={to}>
      {cloneElement(children, {
        className: isActive ? "active-link" : "",
      })}
    </Link>
  );
};
