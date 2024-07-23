import React, { useEffect, useState } from "react";

import { MdOutlineCreate } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import Button from "./Button";
import FormModal from "./FormModal";

const scrollThreshold = 200;
const navlinks = [
  { name: "Home", path: "#heroSection" },
  { name: "Articles", path: "#articleSection" },
  { name: "News", path: "#ctaSection" },
];

const Navbar = () => {
  const [active, setActive] = useState(0);
  const [scrolledValue, setScrolledValue] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", handleScrollValue);
    return () => window.removeEventListener("scroll", handleScrollValue);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, scrollBehavior: "smooth" });
  }, [pathname]);

  const handleScrollValue = () => {
    const scroll = window.scrollY;
    if (scroll > scrollThreshold) {
      setScrolledValue(scrollThreshold);
    } else {
      setScrolledValue(scroll);
    }
  };

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: `rgba(17, 1, 30, ${scrolledValue / scrollThreshold})`,
      }}
    >
      <Link className="alfblogs" to="/">
        Alf<span>Blogs</span>
      </Link>
      {/* navlinks for home only */}
      {pathname === "/" && (
        <div className="navbar-links">
          {navlinks.map((navlink, index) => (
            <a
              key={navlink.path}
              href={navlink.path}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              {navlink.name}
            </a>
          ))}
        </div>
      )}
      {pathname === "/" ? (
        <a href="#ctaSection">
          <Button variant="primary">Subscribe</Button>
        </a>
      ) : (
        <FormModal title="Create Post">
          {(toggleModal) => (
            <Button variant="primary" onClick={toggleModal}>
              <MdOutlineCreate size={20} />
              Create Article
            </Button>
          )}
        </FormModal>
      )}
    </div>
  );
};

export default Navbar;