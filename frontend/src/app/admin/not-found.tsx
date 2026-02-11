import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <FileQuestion className="w-7 h-7 text-gray-400" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Page not found</h2>
      <p className="text-sm text-gray-500 mb-6">
        The admin page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
