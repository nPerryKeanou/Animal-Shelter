import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const Footer = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition hover:underline text-white ${isActive ? "underline" : ""}`;

  return (
    <footer className="w-full bg-secondary">
      <div className="mx-0 flex w-full items-center justify-between px-6 py-3">
        {/* Logo + nom */}
        <div className="flex items-center gap-3 text-white font-semibold">
          <img src={logo} alt="Pet Foster Connect" className="h-8 w-8" />
          <span>Pet Foster Connect</span>
        </div>

        {/* Liens centraux */}
        <nav className="flex gap-6 text-sm">
          <NavLink to="/mentions-legales" className={linkClass}>
            Mentions légales
          </NavLink>
          <NavLink to="/confidentialite" className={linkClass}>
            Politique de confidentialité
          </NavLink>
          <NavLink to="/a-propos" className={linkClass}>
            À propos
          </NavLink>
        </nav>

        {/* Bouton contact */}
        <NavLink
          to="/contact"
          className={({ isActive }: { isActive: boolean }) =>
            `text-sm font-medium text-white transition hover:underline ${
              isActive ? "underline" : ""
            }`
          }
        >
          Nous contacter
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
