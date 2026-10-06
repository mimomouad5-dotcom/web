'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      // TODO: Call API endpoint
      console.log('Starting research for:', topic);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-white">DEXTER</h1>
          <p className="text-slate-400">AI Research to Presentation</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12">
          {/* Hero Section */}
          <section className="text-center">
            <h2 className="text-5xl font-bold text-white mb-4">
              Turn Research into Presentations
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Enter any research topic and DEXTER will generate a professional, source-grounded PowerPoint deck in minutes.
            </p>
          </section>

          {/* Search Form */}
          <section className="max-w-2xl mx-auto w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your research topic..."
                  className="w-full px-6 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate Presentation'}
              </button>
            </form>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Research',
                description: 'Intelligent research gathering from web and academic sources',
              },
              {
                title: 'Source Verification',
                description: 'Every claim is backed by credible, trackable sources',
              },
              {
                title: 'Professional Design',
                description: 'Automatic slide design with optimal layouts and themes',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
