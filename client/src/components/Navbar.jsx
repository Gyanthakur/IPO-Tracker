import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext';
import { useIpoModal } from '../context/IpoModalContext';

const linkCls = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
  }`;

export default function Navbar() {
  const { user } = useUser();
  const { theme, toggle } = useTheme();
  const { openAdd } = useIpoModal();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  useEffect(() => { setOpen(false); }, [pathname]);

  const links = (
    <>
      <SignedIn>
        <NavLink to="/" end className={linkCls}>Dashboard</NavLink>
        <NavLink to="/applied" className={linkCls}>Applied</NavLink>
        <NavLink to="/allotted" className={linkCls}>Allotted</NavLink>
        <NavLink to="/not-allotted" className={linkCls}>Not Allotted</NavLink>
        <NavLink to="/calculator" className={linkCls}>Calculator</NavLink>
        {isAdmin && <NavLink to="/admin" className={linkCls}>Admin</NavLink>}
      </SignedIn>
      <SignedOut>
        <NavLink to="/sign-in" className={linkCls}>Login</NavLink>
        <NavLink to="/sign-up" className={linkCls}>Sign up</NavLink>
      </SignedOut>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:px-6">
        <Link to="/" className="whitespace-nowrap text-base font-bold sm:text-lg">
          📈 IPO Tracker
        </Link>

        {/* desktop menu */}
        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">{links}</nav>

        <div className="ml-auto flex items-center gap-2">
          <SignedIn>
            <button onClick={openAdd} className="btn btn-primary" aria-label="Add IPO">
              <span className="text-lg leading-none">+</span>
              <span className="hidden sm:inline">Add IPO</span>
            </button>
          </SignedIn>

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-lg hover:bg-white/10"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <SignedIn><UserButton /></SignedIn>

          {/* hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-3 pb-3 pt-2 lg:hidden">
          {links}
        </nav>
      )}
    </header>
  );
}