import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/* 🔹 Separate Desktop Nav Links */
const DesktopLinks = ({ links, scrollToSection }) => (
  <div className="hidden md:flex items-center space-x-8">
    {links.map((link) =>
      link.href.startsWith("#") ? (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(link.href);
          }}
          className="text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium relative group py-2"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      ) : (
        <Link
          key={link.href}
          to={link.href}
          className="text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium relative group py-2"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      )
    )}
  </div>
);

/* 🔹 Separate Mobile Nav Links */
const MobileLinks = ({ links, scrollToSection, closeMenu }) => (
  <div className="flex flex-col items-start justify-start space-y-4 mt-20 px-8">
    {links.map((link, index) =>
      link.href.startsWith("#") ? (
        <motion.a
          key={link.href}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(link.href);
            closeMenu();
          }}
          className="text-gray-300 hover:text-orange-500 text-lg font-medium transition-colors duration-300 block w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06, type: "spring", stiffness: 120, damping: 14 }}
          whileHover={{ x: 8, color: "#f97316" }}
        >
          {link.label}
        </motion.a>
      ) : (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06, type: "spring", stiffness: 120, damping: 14 }}
          whileHover={{ x: 8 }}
        >
          <Link
            to={link.href}
            onClick={closeMenu}
            className="text-gray-300 hover:text-orange-500 text-lg font-medium transition-colors duration-300"
          >
            {link.label}
          </Link>
        </motion.div>
      )
    )}
  </div>
);

/* 🔹 Desktop Navbar */
const DesktopNav = ({ links, scrollToSection, isScrolled }) => (
  <nav
    className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/90 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}
  >
    <div className="container mx-auto px-6 flex items-center justify-between h-20">
      <Link
        to="/"
        onClick={() => scrollToSection("#home")}
        className="text-2xl font-bold tracking-tight bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
      >
        MSJ TRADERS
      </Link>
      <DesktopLinks links={links} scrollToSection={scrollToSection} />
    </div>
  </nav>
);

/* 🔹 Mobile Navbar (Fixed) */
const MobileNav = ({ links, scrollToSection, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Header Bar - Always Visible */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-[60] md:hidden transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(0, 0, 0, 0.7)"
            : isOpen
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <Link
            to="/"
            onClick={() => {
              scrollToSection("#home");
              setIsOpen(false);
            }}
            className="text-2xl font-bold tracking-tight bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
          >
            MSJ TRADERS
          </Link>
          <motion.button
            onClick={() => setIsOpen(true)}
            className="text-gray-300 hover:text-orange-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={28} />
          </motion.button>
        </div>
      </motion.div>

      {/* ✅ Overlay + Animated Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            ></motion.div>

            {/* Slide-in animated menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-[70]"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
                <motion.h2
                  className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  Menu
                </motion.h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <X size={28} />
                </motion.button>
              </div>

              <div className="relative z-10">
                <MobileLinks
                  links={links}
                  scrollToSection={scrollToSection}
                  closeMenu={() => setIsOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* 🔹 Main Navigation Component */
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#clients", label: "Clients" },
    { href: "#contact", label: "Contact" },
    { href: "/services", label: "Services" },
  ];

  const scrollToSection = (href) => {
    if (href === "#home" && location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector("#home");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }

    if (location.pathname === "/" && href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <DesktopNav
        links={navLinks}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
      />
      <MobileNav
        links={navLinks}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
      />
    </>
  );
};

export default Navigation;
