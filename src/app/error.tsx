"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center rounded-[2rem] border border-gray-200/80 bg-white/70 p-10 text-center shadow-sm">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-lavender text-xl font-black text-brand-forest">
        !
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        We hit a loose connection
      </h1>
      <p className="mt-4 max-w-md text-gray-600">
        {error.message.includes("SQLITE") ||
        error.message.includes("no such table")
          ? "It looks like the database isn't set up yet. Run these commands in your terminal:"
          : "An unexpected error occurred. Try refreshing the page."}
      </p>

      {(error.message.includes("SQLITE") ||
        error.message.includes("no such table")) && (
        <pre className="mt-4 rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-800">
          {`pnpm run db:push\npnpm run seed`}
        </pre>
      )}

      <button
        onClick={reset}
        className="mt-6 rounded-full bg-brand-forest px-5 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5 hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
