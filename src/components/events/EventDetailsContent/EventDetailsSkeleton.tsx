
const EventDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-8 h-5 w-32 rounded bg-slate-200" />

        <div className="aspect-[21/9] rounded-3xl bg-slate-200" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <div className="h-64 rounded-3xl bg-white" />
            <div className="h-52 rounded-3xl bg-white" />
          </div>

          <div className="h-96 rounded-3xl bg-white" />
        </div>

      </div>
    </main>
  );
};

export default EventDetailsSkeleton;
