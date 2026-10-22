export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string;
  stars: number | string;
  forks?: number;
  openIssues?: number;
  language?: string;
  topics?: string[];
  ownerAvatar: string;
  htmlUrl: string;
  category: string;
  rank?: number;
  highlight?: string;
  badge?: string;
  image?: string;
  installation?: string;
  readmePreview?: string;
}

export const PRESET_REPOSITORIES: GitHubRepo[] = [
  {
    name: "taste-skill",
    fullName: "Leonxlnx/taste-skill",
    description: "Agent skills that give coding agents taste: art direction, reference images and a browser check instead of generic AI pages",
    stars: "100k+",
    forks: 6788,
    openIssues: 3,
    language: "JavaScript",
    topics: ["agent-skills", "anti-slop", "art-direction", "frontend", "claude-code"],
    ownerAvatar: "https://avatars.githubusercontent.com/u/219127460?v=4",
    htmlUrl: "https://github.com/Leonxlnx/taste-skill",
    category: "Design Systems & UI",
    rank: 1,
    badge: "v2.0 Taste",
    highlight: "Real-browser inspector • Anti-slop gallery rules • Color proportion theory",
    installation: "npx skills add Leonxlnx/taste-skill",
    image: "/assets/media_1792601730468_3a4b2a38.png",
    readmePreview: "Distilled from 247 curated gallery sites (One Page Love, Awwwards). Deals researched directions, strict no-slop rules, and screenshot verification."
  },
  {
    name: "ponytail",
    fullName: "antigravity-community/ponytail",
    description: "He says nothing. He writes one line. It works. Extreme minimalism & token efficiency for AI coding workflows.",
    stars: "171k",
    forks: 14200,
    openIssues: 12,
    language: "TypeScript",
    topics: ["discipline", "refactor", "token-savings", "minimalism"],
    ownerAvatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    htmlUrl: "https://github.com/topics/vibe-coding",
    category: "Coding Discipline",
    rank: 2,
    badge: "v5.3.2",
    highlight: "Standard library first • YAGNI discipline • Zero unrequested abstractions",
    installation: "npx skills add ponytail",
    image: "/assets/media_1792601730446_11856b7a.png",
    readmePreview: "Before any code change, always apply the ponytail discipline. Can it be one line? Does standard library do it? Build minimum that works."
  },
  {
    name: "ui-ux-pro-max",
    fullName: "nextlevel-ai/ui-ux-pro-max",
    description: "Multi-framework design intelligence system with 192 reasoning rules, 79 searchable styles, and 95 curated color palettes.",
    stars: "138k",
    forks: 9840,
    openIssues: 5,
    language: "Python",
    topics: ["design-intelligence", "ux-rules", "color-palettes", "multi-agent"],
    ownerAvatar: "https://avatars.githubusercontent.com/u/9919?v=4",
    htmlUrl: "https://github.com/topics/design-system",
    category: "Design Systems & UI",
    rank: 3,
    badge: "v2.15.0",
    highlight: "192 Reasoning Rules • 79 Searchable UI Styles • Multi-Agent Ready",
    installation: "uipro init --ai claude",
    image: "/assets/media_1792601730468_3a4b2a38.png",
    readmePreview: "Searchable database of UI styles, color palettes, font pairings, chart types, and UX guidelines. Build beautiful interfaces with AI recommendations."
  },
  {
    name: "agent-skills",
    fullName: "anthropics/agent-skills",
    description: "Production-grade engineering skills for AI coding agents. Enforces automated testing, linting gates, and senior workflows.",
    stars: "142k",
    forks: 11200,
    openIssues: 8,
    language: "Python",
    topics: ["agent-engineering", "quality-gates", "test-fixtures", "cursor"],
    ownerAvatar: "https://avatars.githubusercontent.com/u/76263028?v=4",
    htmlUrl: "https://github.com/topics/autonomous-agents",
    category: "Architecture",
    rank: 4,
    badge: "v4.0.1",
    highlight: "Encodes senior engineer workflows, quality gates & test fixtures",
    installation: "npx @anthropic/agent-skills init",
    image: "/assets/media_1792601730484_8b7292a8.png",
    readmePreview: "Skills encode the workflows, quality gates, and best practices that senior engineers use when building software."
  },
  {
    name: "graphify",
    fullName: "graphify-labs/graphify",
    description: "Cut agent token spend by 80%. Graphify maps code, docs, and assets into queryable knowledge graphs for AI assistants.",
    stars: "119k",
    forks: 8300,
    openIssues: 4,
    language: "Rust",
    topics: ["knowledge-graph", "codebase-memory", "yc-s26", "token-spend"],
    ownerAvatar: "https://avatars.githubusercontent.com/u/6154722?v=4",
    htmlUrl: "https://github.com/topics/knowledge-graph",
    category: "Codebase Memory",
    rank: 5,
    badge: "v0.9.93",
    highlight: "Formal verification memory • Replaces blind grepping with Cypher graphs",
    installation: "pip install graphify-mcp",
    image: "/assets/media_1792601730499_487ec5d0.png",
    readmePreview: "Always-on memory that governs your agents, keeps code quality high, and proves correctness with formal verification."
  },
  {
    name: "caveman",
    fullName: "antigravity-community/caveman",
    description: "Ultra-compressed communication mode. Cuts output tokens 65% by speaking like smart caveman while keeping full technical accuracy.",
    stars: "89k",
    forks: 4120,
    openIssues: 2,
    language: "Shell",
    topics: ["token-compression", "caveman-mode", "prompt-engineering"],
    ownerAvatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    htmlUrl: "https://github.com/topics/prompt-engineering",
    category: "Coding Discipline",
    rank: 6,
    badge: "v1.2.0",
    highlight: "Drop fluff, articles, filler. Numbers & tech exact. 65% token savings.",
    installation: "npx skills add caveman",
    image: "/assets/media_1792601730446_11856b7a.png",
    readmePreview: "Respond terse like smart caveman. All technical substance stay. Only fluff die. Numbers, units exact."
  }
];

export async function fetchLiveGitHubRepo(query: string): Promise<GitHubRepo | null> {
  const cleanQuery = query.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '');
  
  try {
    let repoData: any = null;
    
    // If user provided owner/repo format
    if (cleanQuery.includes('/') && cleanQuery.split('/').length === 2) {
      const res = await fetch(`https://api.github.com/repos/${cleanQuery}`);
      if (res.ok) {
        repoData = await res.json();
      }
    }
    
    // Fallback search API
    if (!repoData) {
      const searchRes = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+sort:stars&per_page=1`);
      if (searchRes.ok) {
        const searchJson = await searchRes.json();
        if (searchJson.items && searchJson.items.length > 0) {
          repoData = searchJson.items[0];
        }
      }
    }

    if (!repoData) return null;

    return {
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description || "No description provided for this repository.",
      stars: repoData.stargazers_count > 1000 ? `${(repoData.stargazers_count / 1000).toFixed(1)}k` : repoData.stargazers_count,
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
      language: repoData.language || "Unknown",
      topics: repoData.topics || [],
      ownerAvatar: repoData.owner?.avatar_url || "https://github.githubassets.com/favicons/favicon.svg",
      htmlUrl: repoData.html_url,
      category: repoData.topics?.includes("design") ? "Design Systems & UI" : 
                repoData.topics?.includes("memory") ? "Codebase Memory" : "Autonomous Agents",
      rank: 99,
      badge: repoData.default_branch || "main",
      highlight: `Pushed recently (${new Date(repoData.pushed_at).toLocaleDateString()}) • License: ${repoData.license?.spdx_id || 'Public'}`,
      installation: `npx skills add ${repoData.full_name}`,
      readmePreview: `Official repository: ${repoData.html_url}. Topics: ${(repoData.topics || []).slice(0, 5).join(', ')}`
    };
  } catch (err) {
    console.error("Live GitHub fetch error:", err);
    return null;
  }
}
