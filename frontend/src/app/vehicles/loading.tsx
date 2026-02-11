export default function VehiclesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded mb-6" />

      {/* Title skeleton */}
      <div className="h-7 w-64 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-96 bg-gray-200 rounded mb-8" />

      {/* Vehicle makes grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
