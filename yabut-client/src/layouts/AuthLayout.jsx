import { Outlet, useLocation, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import authImage from '../assets/images/auth-image.png';

const AuthLayout = () => {
  const location = useLocation();
  const isSignup = location.pathname.includes('/signup');

  const content = isSignup
  ? {
      eyebrow: "Create Account",
      title: "Build your creative library and explore.",
      description:
        "Create a Draft & Drift account to save your purchases, download digital products, and access curated templates, brand kits, and design assets anytime.",
      imagePosition: "right center",
    }
  : {
      eyebrow: "Welcome Back",
      title: "Return to your design workspace.",
      description:
        "Log in to access your purchased digital products, manage your downloads, and continue exploring clean, ready-to-use creative assets.",
      imagePosition: "left center",
    };

  return (
    <section className="min-h-screen overflow-hidden bg-[#0b1220]">
      <div className="relative hidden min-h-screen lg:block">
        {/* IMAGE PANEL */}
        <motion.div
          className="absolute inset-y-0 w-1/2 overflow-hidden"
          animate={{ left: isSignup ? '50%' : '0%' }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: content.imagePosition,
              scale: isSignup ? 1.04 : 1,
            }}
            transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
            style={{
              backgroundImage: `url(${authImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div className="absolute inset-0 bg-[#0b1220]/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-[#0f172a]/45 to-[#1e293b]/70" />

          <div className="relative z-10 flex h-full items-center px-16">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignup ? 'signup-caption' : 'signin-caption'}
                  initial={{ opacity: 0, x: isSignup ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isSignup ? -40 : 40 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e6c27a]">
                    {content.eyebrow}
                  </p>

                  <h1 className="mt-6 text-5xl font-bold leading-tight text-white sm:text-6xl">
                    {content.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-lg leading-9 text-slate-200">
                    {content.description}
                  </p>

                  {/* SWITCH CTA BUTTON */}
                  <div className="mt-12">
                    {isSignup ? (
                      <Link
                        to="/auth/signin"
                        className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-[#0f172a]"
                      >
                        Already have an account? Log In
                      </Link>
                    ) : (
                      <Link
                        to="/auth/signup"
                        className="inline-flex rounded-full border border-[#e6c27a] bg-[#e6c27a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f172a] transition hover:bg-[#d4b06a]"
                      >
                        New here? Create Account
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* FORM PANEL */}
        <motion.div
          className="absolute inset-y-0 w-1/2 bg-[#f5f1e8] px-16"
          animate={{ left: isSignup ? '0%' : '50%' }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-xl rounded-[2rem] border border-[#dccca8] bg-white/85 p-10 shadow-2xl backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: isSignup ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isSignup ? 50 : -50 }}
                  transition={{ duration: 0.35 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE VERSION */}
      <div className="lg:hidden">
        <div
          className="relative min-h-[38vh] bg-cover bg-center px-6 py-10"
          style={{ backgroundImage: `url(${authImage})` }}
        >
          <div className="absolute inset-0 bg-[#0b1220]/65" />

          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e6c27a]">
              {content.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
              {content.title}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200">
              {content.description}
            </p>

            <div className="mt-7">
              {isSignup ? (
                <Link
                  to="/auth/signin"
                  className="inline-flex rounded-full border border-white/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Log In
                </Link>
              ) : (
                <Link
                  to="/auth/signup"
                  className="inline-flex rounded-full bg-[#e6c27a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f172a]"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#f5f1e8] px-6 py-8">
          <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-[#dccca8] bg-white/85 p-6 shadow-2xl backdrop-blur-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;