export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-forest" />
        <p className="mt-4 text-sm font-medium text-gray-500">
          Making the connection...
        </p>
      </div>
    </div>
  );
}
