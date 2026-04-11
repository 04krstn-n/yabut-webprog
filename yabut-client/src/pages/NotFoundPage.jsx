import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-zinc-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl rounded-[2rem] border border-zinc-700 bg-zinc-800 p-8 text-center shadow-sm sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Error Page
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-6xl">
          404
        </h1>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-400">
          The page you are looking for does not exist or may have been moved.
          Please check the link or return to the homepage to continue browsing
          Draft & Drift.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button to="/" variant="primary">
            Back Home
          </Button>
          <Button to="/articles">
            View Articles
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

