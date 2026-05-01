import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        Join Draft & Drift
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Create Your Account
      </h1>

      <p className="mt-3 text-sm leading-7 text-zinc-600">
        Sign up to access curated digital products, manage your 
        purchases, and download your creative assets anytime.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Enter first name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Enter last name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className={inputClasses}/>
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputClasses}/>
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password to protect your account and digital purchases.
          </p>
        </div>

        <Button type="submit" variant="secondary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="tertiary" className={actionButtonClassName}>
            Continue with Google
          </Button>
          <Button type="button" variant="tertiary" className={actionButtonClassName}>
            Continue with Apple
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;