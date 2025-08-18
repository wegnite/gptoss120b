import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-400">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-500 dark:text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/en"
          className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}