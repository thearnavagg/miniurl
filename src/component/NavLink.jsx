import React from "react";

const NavLink = ({ href, children }) => {
  const handleScroll = (e) => {
    e.preventDefault(); 
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href={href}
      onClick={handleScroll}
      className="text-sm font-medium hover:underline underline-offset-4"
    >
      {children}
    </a>
  );
};

export default NavLink;
