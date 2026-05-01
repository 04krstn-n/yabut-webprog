import { NavLink } from "react-router-dom";
import logoImage from "../assets/images/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "text-xs font-semibold uppercase tracking-[0.2em] transition duration-200",
    isActive ? "text-blue-300" : "text-white hover:text-blue-400",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1e293b] bg-zinc-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-10">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-white shadow-sm">
              <img src={logoImage} alt="Logo" className="h-8 w-18" />
            </div>

            <div>
              <p className="text-base font-bold tracking-wide text-white">
                Draft & Drift
              </p>
              <p className="text-xs text-zinc-400">
                Clean layouts and simple content
              </p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex">
          <NavLink
            to="/auth/signin"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-blue-300 hover:text-[#0f172a] px-4 py-2 rounded-full border border-blue-300"
          >
            Log In
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
