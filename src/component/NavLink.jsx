import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ href, children }) => (
  <Link
    to={href}
    className="text-sm font-medium hover:underline underline-offset-4"
  >
    {children}
  </Link>
);

export default NavLink;
