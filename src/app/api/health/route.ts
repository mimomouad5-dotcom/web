export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-400">Workspace</p>
            <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
          </div>
          <a
            href="/"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
          >
            New project
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Projects</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Drafts</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Exports</p>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Projects</h2>
          <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
            No projects yet. Create your first research project from the home page.
          </div>
        </section>
      </div>
    </main>
  );
}
