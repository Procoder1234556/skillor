import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Trophy,
  GitCompare,
  Code2,
  WandSparkles,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  Star,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Cpu,
  Workflow,
  Compass,
  LayoutDashboard
} from 'lucide-react';
import DashboardView from './components/DashboardView';
import SmoothLoopVideo from './components/SmoothLoopVideo';

const FEATURED_SKILLS = [
  {
    rank: 1,
    name: "taste-skill",
    slug: "taste-skill",
    tagline: "Agent skills that give coding agents taste: art direction & no-slop rules.",
    category: "Design Systems & UI",
    stars: "100k+",
    trending: "Trending Global",
    badge: "v2.0",
    compat: ["Claude Code", "Cursor", "Windsurf", "Antigravity"],
    highlight: "Anti-slop gallery rules • Optical type sizing • Real browser check",
    image: "/assets/media_1792601730468_3a4b2a38.png"
  },
  {
    rank: 2,
    name: "Ponytail",
    slug: "ponytail",
    tagline: "He says nothing. He writes one line. It works.",
    category: "Coding Discipline & Refactor",
    stars: "171k",
    trending: "#1 Repo of the Day",
    badge: "v5.3.2",
    compat: ["Claude Code", "Cursor", "Windsurf", "Antigravity"],
    highlight: "Standard library first • Extreme token efficiency • Zero fluff",
    image: "/assets/media_1792601730446_11856b7a.png"
  },
  {
    rank: 3,
    name: "UI UX Pro Max",
    slug: "ui-ux-pro-max",
    tagline: "Design intelligence for building professional UI/UX across frameworks.",
    category: "Design Systems & UI",
    stars: "138k",
    trending: "73k / month",
    badge: "v2.15.0",
    compat: ["Claude Code", "Cursor", "Windsurf", "Antigravity"],
    highlight: "192 Reasoning Rules • 79 Searchable UI Styles • 95 Color Palettes",
    image: "/assets/media_1792601730468_3a4b2a38.png"
  },
  {
    rank: 4,
    name: "Agent Skills",
    slug: "agent-skills",
    tagline: "Production-grade engineering skills for AI coding agents.",
    category: "Architecture & Best Practices",
    stars: "142k",
    trending: "#1 Repo of the Day",
    badge: "v4.0.1",
    compat: ["Claude Code", "Cursor", "Windsurf", "Codegen"],
    highlight: "Encodes senior engineer workflows, quality gates & test fixtures",
    image: "/assets/media_1792601730484_8b7292a8.png"
  },
  {
    rank: 5,
    name: "Graphify",
    slug: "graphify",
    tagline: "Cut agent token spend by 80%. Knowledge graphs for whole repos.",
    category: "Context & Codebase Memory",
    stars: "119k",
    trending: "9M Downloads • YC S26",
    badge: "v0.9.93",
    compat: ["Claude Code", "Cursor", "Windsurf", "Copilot"],
    highlight: "Formal verification memory • Replaces blind grepping with Cypher graphs",
    image: "/assets/media_1792601730499_487ec5d0.png"
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const categories = ['All', 'Coding Discipline', 'Design Systems', 'Architecture', 'Codebase Memory', 'Testing'];

  const filteredSkills = FEATURED_SKILLS.filter(skill => {
    const matchesTab = activeTab === 'All' || 
      (activeTab === 'Coding Discipline' && skill.category.includes('Discipline')) ||
      (activeTab === 'Design Systems' && skill.category.includes('Design')) ||
      (activeTab === 'Architecture' && skill.category.includes('Architecture')) ||
      (activeTab === 'Codebase Memory' && skill.category.includes('Memory'));
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (currentView === 'dashboard') {
    return <DashboardView onBackToLanding={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] relative overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* APPLE PHYSICAL DEPTH: Subtle Specular Lighting & Refined Ambiance */}
      <div className="fixed inset-0 pointer-events-none apple-mesh-backdrop z-0"></div>

      {/* SECTION 1: APPLE FLUID TRANSLUCENT NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/[0.08] transition-all">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-base tracking-tight text-white flex items-center gap-1.5">
              Skillor
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#86868b]">
                Directory
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13px] font-normal text-[#86868b]">
            <a href="#directory" className="hover:text-white transition-colors">Explore</a>
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className="text-white font-medium hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Skill Dashboard</span>
            </button>
            <a href="#rankings" className="hover:text-white transition-colors">Rankings</a>
            <a href="#features" className="hover:text-white transition-colors">Compare</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="apple-btn-primary px-3.5 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#86868b] hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-black/95 backdrop-blur-2xl px-6 py-5 flex flex-col gap-4 text-sm font-medium">
            <button 
              onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} 
              className="text-left text-white font-semibold py-1 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Skill Dashboard</span>
            </button>
            <a href="#directory" onClick={() => setMobileMenuOpen(false)} className="text-[#86868b] hover:text-white py-1">Explore Skills</a>
            <a href="#rankings" onClick={() => setMobileMenuOpen(false)} className="text-[#86868b] hover:text-white py-1">Rankings</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#86868b] hover:text-white py-1">Compare</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[#86868b] hover:text-white py-1">FAQ</a>
          </div>
        )}
      </header>

      {/* SECTION 2: REFINED APPLE HERO WITH CINEMATIC VIDEO BACKGROUND */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 overflow-hidden">
        
        {/* Seamless Smooth-Loop Video Component */}
        <SmoothLoopVideo />

        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center relative z-10">
          
          {/* Restrained Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-[12px] font-medium text-[#f5f5f7] mb-7 backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]"></span>
            <span>The Vibe-Coding Registry</span>
            <span className="text-white/20">•</span>
            <span className="text-[#86868b]">Community Curated</span>
          </div>

          {/* Crisp Apple Typography Display */}
          <h1 className="text-4xl sm:text-5xl md:text-[62px] font-bold tracking-tight text-white leading-[1.04] mb-5">
            Find the Best Skills for <br />
            <span className="text-[#f5f5f7]">
              Vibe Coding.
            </span>
          </h1>

          {/* Optical Size Subtitle */}
          <p className="text-[#86868b] text-base md:text-lg max-w-[580px] leading-relaxed mb-9 font-normal">
            Discover, compare, and rank production-tested skills for AI-powered coding workflows. Built for Claude Code, Cursor, Windsurf, and Antigravity.
          </p>

          {/* Physical Buttons with Spring Interaction */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="apple-btn-primary w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Launch Live Dashboard</span>
            </button>
            <a
              href="#directory"
              className="apple-btn-secondary w-full sm:w-auto px-5 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Trophy className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Explore Top Ranks</span>
            </a>
          </div>

          <p className="mt-5 text-[11px] text-[#6e6e73] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]" />
            Free & open community directory • GitHub REST API live synchronization
          </p>
        </div>
      </section>

      {/* SECTION 3: PRODUCT SHOWCASE (Apple Glass Frame - Ponytail) */}
      <section id="directory" className="pb-28 px-4 sm:px-6 relative">
        <div className="max-w-[1020px] mx-auto">
          <div className="relative rounded-2xl apple-glass p-3 sm:p-5 group">
            
            {/* Window chrome topbar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/[0.08] mb-3 text-xs text-[#86868b]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80"></div>
                </div>
                <span className="font-mono text-[11px] text-[#6e6e73] ml-2">skillor.dev/skills/ponytail</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] text-white font-medium">
                  <Flame className="w-3 h-3 text-[#FF9F0A]" /> Trending #1
                </span>
              </div>
            </div>

            {/* Product image */}
            <div className="relative rounded-xl overflow-hidden bg-[#000000] border border-white/[0.06]">
              <img 
                src="/assets/media_1792601730446_11856b7a.png" 
                alt="Ponytail AI Coding Skill"
                className="w-full h-auto object-cover max-h-[580px] select-none"
              />
            </div>

            {/* Micro Details Grid */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[11px] text-[#86868b] uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-[#FF9F0A]" />
                  <span>GitHub Leaderboard</span>
                </div>
                <div className="text-sm font-semibold text-white">#1 Repository Of The Day</div>
                <div className="text-xs text-[#6e6e73] mt-0.5">171k stars • 20 agents supported</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[11px] text-[#86868b] uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <Terminal className="w-3.5 h-3.5 text-[#0A84FF]" />
                  <span>Core Philosophy</span>
                </div>
                <div className="text-sm font-semibold text-white">Ponytail Discipline</div>
                <div className="text-xs text-[#6e6e73] mt-0.5">"He says nothing. He writes one line. It works."</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[11px] text-[#86868b] uppercase font-semibold flex items-center gap-1.5 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-[#30D158]" />
                  <span>Compatibility</span>
                </div>
                <div className="text-sm font-semibold text-white">Claude Code & Cursor</div>
                <div className="text-xs text-[#6e6e73] mt-0.5">Instant prompt & rules integration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BENEFITS INTRODUCTION */}
      <section className="py-20 px-4 sm:px-6 relative border-t border-white/[0.06]">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-[#86868b] mb-4">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Why Skillor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
            The right skills make your <br />
            <span className="text-[#f5f5f7]">AI coding workflow</span> better.
          </h2>
          <p className="text-[#86868b] text-base leading-relaxed mb-6 font-normal">
            Find the skills that help you build smarter and faster. Skillor indexes battle-tested agent instructions, MCP tools, and system rules so you never waste tokens debugging repetitive errors.
          </p>
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors"
            >
              <span>Launch repository explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: LARGE FEATURE SHOWCASE (UI UX Pro Max) */}
      <section id="rankings" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-[1020px] mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Discover the skills worth using.
            </h2>
            <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
              Explore ranked skills and find the exact fit for your stack.
            </p>
          </div>

          <div className="rounded-2xl apple-glass p-3 sm:p-5 relative mb-8 group">
            <div className="flex items-center justify-between pb-3 px-1 border-b border-white/[0.08] mb-3 text-xs text-[#86868b]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="font-mono text-white text-[12px] font-medium">UI UX Pro Max</span>
                <span className="text-[#6e6e73] text-[11px]">— Multi-framework design intelligence</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#86868b] font-mono">Downloads: 73k/mo</span>
                <span className="text-[11px] text-white font-mono font-medium">Rules: 192</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#000000]">
              <img 
                src="/assets/media_1792601730468_3a4b2a38.png" 
                alt="UI UX Pro Max Design Intelligence"
                className="w-full h-auto object-cover select-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl apple-glass">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3.5">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Discover Skills</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Filter through verified agent capabilities, system prompts, and MCP servers indexed directly from GitHub.
              </p>
            </div>

            <div className="p-5 rounded-2xl apple-glass">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3.5">
                <GitCompare className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Compare Options</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Side-by-side metrics: stars, downloads, token overhead, and native AI tool compatibility matrices.
              </p>
            </div>

            <div className="p-5 rounded-2xl apple-glass">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3.5">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Choose Confidently</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Every listed skill includes transparent quality indicators, community feedback, and direct source references.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURE GRID */}
      <section id="features" className="py-20 px-4 sm:px-6 relative border-t border-white/[0.06]">
        <div className="max-w-[1020px] mx-auto space-y-24">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Everything you need to find the right skill.
            </h2>
            <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
              Curated and indexed specifically for the vibe-coding revolution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-2xl apple-glass p-3 sm:p-4 group">
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#000000]">
                  <img 
                    src="/assets/media_1792601730484_8b7292a8.png" 
                    alt="Agent Skills Engineering Best Practices"
                    className="w-full h-auto object-cover select-none"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-white mb-3.5 w-fit">
                <Code2 className="w-3.5 h-3.5" />
                <span>Production Workflows</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Senior engineering gates for autonomous agents.
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed mb-5">
                Skills like <span className="text-white font-medium">Agent Skills</span> encode workflows, quality gates, and automated test fixtures that senior engineers use daily.
              </p>
              <div className="space-y-2.5 text-xs text-[#a1a1a6] mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#30D158]" />
                  <span>Enforces automated linting, test suites, and git etiquette</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#30D158]" />
                  <span>Prevents hallucinated dependencies and dead imports</span>
                </div>
              </div>
              <button onClick={() => setCurrentView('dashboard')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors">
                <span>Inspect in dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-white mb-3.5 w-fit">
                <Workflow className="w-3.5 h-3.5" />
                <span>Context & Token Optimization</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Cut agent token spend by 80% with Knowledge Graphs.
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed mb-5">
                Replace slow, imprecise grep commands with formal code graphs. Tools like <span className="text-white font-medium">Graphify</span> map your entire codebase into a queryable memory graph.
              </p>
              <button onClick={() => setCurrentView('dashboard')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors">
                <span>View Graphify telemetry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="rounded-2xl apple-glass p-3 sm:p-4 group">
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#000000]">
                  <img 
                    src="/assets/media_1792601730499_487ec5d0.png" 
                    alt="Graphify Knowledge Graph"
                    className="w-full h-auto object-cover select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE CTA */}
      <section className="py-24 px-4 sm:px-6 relative border-t border-white/[0.06]">
        <div className="max-w-[1020px] mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-[#86868b] mb-3">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>Interactive Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Ready to explore all vibe-coding skills?
          </h2>
          <p className="text-[#86868b] text-sm sm:text-base leading-relaxed max-w-[580px] mx-auto mb-8">
            Access the full explorer with live search across any GitHub repository, category filter switches, subpage previews, and direct terminal installation codes.
          </p>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="apple-btn-primary px-8 py-3.5 rounded-full text-xs font-semibold inline-flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 stroke-[2.5]" />
            <span>Open Interactive Dashboard</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#000000] py-12 px-4 sm:px-6">
        <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-white text-sm">Skillor</span>
            </div>
            <p className="text-xs text-[#6e6e73] max-w-sm">
              The premier directory and ranking platform for vibe-coding skills, system prompts, and AI agent instructions.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs text-[#86868b]">
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition-colors">Launch Dashboard</button>
            <a href="#directory" className="hover:text-white transition-colors">Explore Skills</a>
            <a href="#rankings" className="hover:text-white transition-colors">Top Rankings</a>
          </div>
        </div>

        <div className="max-w-[1080px] mx-auto mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6e6e73]">
          <span>© 2026 Skillor Inc. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Built with Apple Design Foundations</span>
        </div>
      </footer>

    </div>
  );
}
