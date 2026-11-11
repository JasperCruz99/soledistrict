export default function ProductGridSkeleton({ count = 6 }) {
  return (
    <div aria-hidden="true">
      <p className="sr-only">Loading products</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[4/5] bg-[#EAE9E4]" />
            <div className="mt-3 h-2.5 w-16 bg-[#E2E1DC]" />
            <div className="mt-2 h-3.5 w-3/4 bg-[#E2E1DC]" />
            <div className="mt-2 h-3 w-12 bg-[#E2E1DC]" />
          </div>
        ))}
      </div>
    </div>
  );
}
