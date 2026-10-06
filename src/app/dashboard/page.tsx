import type { FormEvent } from 'react';
import { useState } from 'react';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: topic.trim(),
          topic: topic.trim(),
          language: 'en',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      window.location.href = `/dashboard?project=${data.id}`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-12 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400">AI Research Studio</p>
            <h1 className="mt-2 text-3xl font-bold">DEXTER</h1>
          </div>
          <a
            href="/dashboard"
            className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
          >
            Open Dashboard
          </a>
        </header>

        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              Research → Outline → Presentation
            </p>
            <h2 className="max-w-xl text-5xl font-black leading-tight tracking-tight">
              Turn any topic into a source-grounded presentation.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              DEXTER finds relevant sources, verifies claims, structures a narrative, and exports a polished deck.
            </p>

            <form onSubmit={onSubmit} className="mt-8 max-w-xl">
              <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-blue-950/40">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Type a research topic, e.g. AI in healthcare analytics"
                  className="w-full border-0 bg-transparent px-5 py-4 text-base text-white outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !topic.trim()}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Generating...' : 'Generate presentation'}
                </button>
                <a
                  href="/dashboard"
                  className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
                >
                  View projects
                </a>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30">
            <div className="space-y-5">
              {[
                ['Research layer', 'Web + academic search with source ranking'],
                ['Evidence mapping', 'Claims tied to verified references'],
                ['Presentation engine', 'Outline, content, and PPTX export'],
                ['RTL multilingual', 'Arabic, English, and French support'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="mb-2 text-sm font-semibold text-blue-300">{title}</div>
                  <p className="text-sm text-slate-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
