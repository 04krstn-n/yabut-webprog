import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-zinc-900 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:bg-white focus:shadow-[4px_4px_0_#18181b]";

const actionButtonClassName =
  "w-full rounded-2xl py-3 text-[11px] font-bold uppercase tracking-[0.2em]";

const SignUpPage = () => {
  return (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
        Join Draft & Drift
      </p>

      <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
        Create your digital design account.
      </h1>

      <p className="mt-4 text-sm leading-7 text-zinc-600">
        Save your purchases, download creative assets anytime, and build your
        own library of templates, graphics, and brand materials.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-bold text-zinc-800">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-bold text-zinc-800">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-bold text-zinc-800">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-bold text-zinc-800">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a strong password to keep your digital purchases and account
            details protected.
          </p>
        </div>

        <Button type="submit" variant="secondary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="tertiary" className={actionButtonClassName}>
            Google
          </Button>
          <Button type="button" variant="tertiary" className={actionButtonClassName}>
            Apple
          </Button>
        </div>

        <p className="pt-2 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link to="/auth/signin" className="font-bold text-zinc-900 underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpPage;