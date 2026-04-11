import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 px-4 py-10 text-zinc-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Draft & Drift</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
            A modern design project focused on clean layouts, readable content,
            and simple but polished user experiences.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Navigation
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/about" className="transition hover:text-white">
              About
            </Link>
            <Link to="/articles" className="transition hover:text-white">
              Articles
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Project Info
          </p>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            Designed to transform a simple wireframe into a more professional
            webpage through better structure, stronger visual hierarchy, and
            consistent branding.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
        © 2026 Draft & Drift. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


