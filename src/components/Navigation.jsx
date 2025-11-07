import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  <div className="flex flex-col items-center justify-center space-y-6 mt-12">
    {links.map((link) =>
      link.href.startsWith("#") ? (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(link.href);
            closeMenu();
          }}
          className="text-gray-300 hover:text-orange-500 text-lg font-medium transition-colors duration-300"
        >
          {link.label}
        </a>
      ) : (
        <Link
          key={link.href}
          to={link.href}
          onClick={closeMenu}
          className="text-gray-300 hover:text-orange-500 text-lg font-medium transition-colors duration-300"
        >
          {link.label}
        </Link>
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

/* 🔹 Mobile Navbar */
const MobileNav = ({ links, scrollToSection, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header Bar (only visible on mobile) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
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
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-300 hover:text-orange-500 transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#111] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Menu
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-orange-500 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <MobileLinks
          links={links}
          scrollToSection={scrollToSection}
          closeMenu={() => setIsOpen(false)}
        />
      </div>
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
