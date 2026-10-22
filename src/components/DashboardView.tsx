import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Trophy,
  ArrowRight,
  Sparkles,
  Flame,
  Star,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Layers,
  ArrowLeft,
  Copy,
  Check,
  GitFork,
  AlertCircle,
  Loader2,
  TrendingUp,
  Code
} from 'lucide-react';
import { PRESET_REPOSITORIES, fetchLiveGitHubRepo } from '../services/github';
import type { GitHubRepo } from '../services/github';

interface DashboardViewProps {
  onBackToLanding: () => void;
}

export default function DashboardView({ onBackToLanding }: DashboardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState<GitHubRepo[]>(PRESET_REPOSITORIES);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const categories = [
    'All',
    'Design Systems & UI',
    'Coding Discipline',
    'Architecture',
    'Codebase Memory'
  ];

  const filteredRepos = repositories.filter(repo => {
    const matchesCategory = selectedCategory === 'All' || repo.category === selectedCategory;
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.topics && repo.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleLiveGitHubSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchingLive(true);
    setLiveError(null);

    const liveData = await fetchLiveGitHubRepo(searchQuery);
    setIsSearchingLive(false);

    if (liveData) {
      startTransition(() => {
        if (!repositories.some(r => r.fullName.toLowerCase() === liveData.fullName.toLowerCase())) {
          setRepositories(prev => [liveData, ...prev]);
        }
        setSelectedRepo(liveData);
      });
    } else {
      setLiveError(`Could not find GitHub repository for "${searchQuery}". Please check the name or URL.`);
    }
  };

  const copyInstallCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] relative overflow-x-hidden font-sans">
      
      {/* Subtle Apple Physical Depth Ambient */}
      <div className="fixed inset-0 pointer-events-none apple-mesh-backdrop z-0"></div>

      {/* APPLE TRANSLUCENT NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/[0.08]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToLanding}
              className="apple-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#f5f5f7] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Landing</span>
            </button>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setSelectedRepo(null)}>
              <div className="w-6 h-6 rounded-md bg-white/10 border border-white/15 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                Skillor
                <span className="text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded-full bg-white/[0.08] text-[#86868b]">
                  Explorer
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#86868b] hover:text-white transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>GitHub Sync Active</span>
            </a>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#30D158]/10 border border-[#30D158]/20 text-[10px] text-[#30D158] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]"></span>
              <span>REST API Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 relative z-10">
        
        {/* SUBPAGE VIEW: REPOSITORY DETAILS */}
        <AnimatePresence>
          {selectedRepo && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="mb-10 rounded-2xl apple-glass p-6 sm:p-8 relative"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedRepo.ownerAvatar}
                    alt={selectedRepo.name}
                    className="w-14 h-14 rounded-2xl border border-white/10 shadow-xl object-cover bg-black"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white">
                        #{selectedRepo.rank || 'LIVE'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {selectedRepo.name}
                      </h2>
                      <span className="text-xs font-mono text-[#86868b] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {selectedRepo.badge || 'vLatest'}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#6e6e73] flex items-center gap-2 mb-2">
                      <Code className="w-3.5 h-3.5" />
                      <span>{selectedRepo.fullName}</span>
                      <span>•</span>
                      <span className="text-white/80">{selectedRepo.category}</span>
                    </div>

                    <p className="text-sm text-[#a1a1a6] max-w-2xl leading-relaxed">
                      {selectedRepo.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setSelectedRepo(null)}
                    className="apple-btn-secondary px-4 py-2 rounded-full text-xs font-medium"
                  >
                    Close Subpage
                  </button>
                  <a
                    href={selectedRepo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="apple-btn-primary px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Open on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>

              {/* Subpage Synced Details Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                
                <div className="lg:col-span-7 space-y-5">
                  {selectedRepo.image ? (
                    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black shadow-xl relative group">
                      <img
                        src={selectedRepo.image}
                        alt={selectedRepo.name}
                        className="w-full h-auto object-cover max-h-[340px]"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl p-6 border border-white/[0.08] bg-white/[0.02] text-center">
                      <Layers className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="text-sm font-semibold text-white">Live Repositiory Synchronized</div>
                      <div className="text-xs text-[#6e6e73] mt-1">Real-time stats loaded from GitHub REST API</div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-white" />
                      <span>Readme Preview</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed">
                      {selectedRepo.readmePreview || selectedRepo.description}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <Star className="w-4 h-4 text-white mx-auto mb-1 fill-current" />
                      <div className="text-sm font-semibold text-white">{selectedRepo.stars}</div>
                      <div className="text-[10px] text-[#6e6e73] uppercase">Stars</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <GitFork className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-sm font-semibold text-white">{selectedRepo.forks || 0}</div>
                      <div className="text-[10px] text-[#6e6e73] uppercase">Forks</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <AlertCircle className="w-4 h-4 text-white mx-auto mb-1" />
                      <div className="text-sm font-semibold text-white">{selectedRepo.openIssues ?? 0}</div>
                      <div className="text-[10px] text-[#6e6e73] uppercase">Issues</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-white/[0.08] relative">
                    <div className="flex items-center justify-between text-[11px] text-[#86868b] mb-2 font-mono">
                      <span>Install Skill</span>
                      <button
                        onClick={() => copyInstallCommand(selectedRepo.installation || `npx skills add ${selectedRepo.fullName}`)}
                        className="inline-flex items-center gap-1 text-[10px] text-white hover:text-white/80 transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-[#30D158]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <code className="text-xs font-mono text-[#f5f5f7] block p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] overflow-x-auto">
                      {selectedRepo.installation || `npx skills add ${selectedRepo.fullName}`}
                    </code>
                  </div>

                  {selectedRepo.topics && selectedRepo.topics.length > 0 && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                        Indexed Topics
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRepo.topics.map(topic => (
                          <span key={topic} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#86868b] font-mono">
                            #{topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#86868b] flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#30D158] shrink-0 mt-0.5" />
                    <span>
                      Sync verified via GitHub REST API. Compatible with Claude Code, Cursor, Windsurf, and Antigravity.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DASHBOARD HEADER & GLOBAL SEARCH BAR */}
        <div className="text-center max-w-[700px] mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[11px] font-medium text-[#86868b] mb-4">
            <Flame className="w-3.5 h-3.5 text-[#FF9F0A]" />
            <span>Real-time GitHub Synced Explorer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Search & Explore Skills
          </h1>

          <p className="text-sm text-[#86868b] leading-relaxed mb-8">
            Query top-ranked vibe-coding tools or type any GitHub repository name (e.g. <span className="text-white font-mono">Leonxlnx/taste-skill</span>) to sync text, stars, and images directly.
          </p>

          {/* Clean Apple Search Bar */}
          <div className="relative max-w-[560px] mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#6e6e73] absolute left-4" />
              <input
                type="text"
                placeholder="Search preset skills or enter GitHub 'owner/repo'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLiveGitHubSearch()}
                className="w-full pl-11 pr-28 py-3 bg-[#16161a] border border-white/[0.12] rounded-full text-sm text-white placeholder-[#6e6e73] focus:outline-none focus:border-white transition-all shadow-lg"
              />
              <button
                onClick={handleLiveGitHubSearch}
                disabled={isSearchingLive || !searchQuery.trim()}
                className="apple-btn-primary absolute right-1.5 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSearchingLive ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Syncing</span>
                  </>
                ) : (
                  <>
                    <span>Sync Live</span>
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>

            {liveError && (
              <p className="text-xs text-[#FF453A] mt-2 text-left flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{liveError}</span>
              </p>
            )}
          </div>
        </div>

        {/* CATEGORISATION OPTIONS BAR */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/[0.04] text-[#86868b] hover:text-white border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TOP TRENDING REPOSITORIES */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-white" />
            <h3 className="text-sm font-semibold text-white">Top Trending Repositories</h3>
            <span className="text-xs text-[#6e6e73]">({filteredRepos.length})</span>
          </div>
          <span className="text-xs text-[#86868b]">Click card to inspect subpage</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map((repo, idx) => (
            <motion.div
              key={repo.fullName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3, delay: idx * 0.03 }}
              onClick={() => setSelectedRepo(repo)}
              className="rounded-2xl apple-glass p-5 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={repo.ownerAvatar}
                      alt={repo.name}
                      className="w-7 h-7 rounded-md border border-white/10 bg-black object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-white/[0.06] border border-white/10 flex items-center justify-center text-[9px] font-mono text-white">
                          #{repo.rank || idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors">
                          {repo.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#6e6e73] truncate block max-w-[150px]">
                        {repo.fullName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#f5f5f7] font-mono bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/10">
                    <Star className="w-3 h-3 fill-current text-[#FFBD2E]" />
                    <span>{repo.stars}</span>
                  </div>
                </div>

                <p className="text-xs text-[#86868b] line-clamp-2 mb-3 leading-relaxed">
                  {repo.description}
                </p>

                {repo.image && (
                  <div className="rounded-lg overflow-hidden border border-white/[0.06] mb-3 bg-black max-h-24">
                    <img
                      src={repo.image}
                      alt={repo.name}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-[#6e6e73]">
                  {repo.category}
                </span>

                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-white group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3 stroke-[2]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>

    </div>
  );
}
