import { NavLink } from 'react-router-dom';
import logoImage from '../assets/logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200',
    isActive
      ? 'bg-white text-zinc-900 shadow-sm'
      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-white shadow-sm">
            <img
              src={logoImage}
              alt="Logo"
              className="h-8 w-18"
            />
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

        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default NavBar;