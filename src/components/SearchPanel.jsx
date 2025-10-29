import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

const sample = [
  {
    title: "Convex + OpenRouter integration guide",
    url: "https://docs.convex.dev",
    snippet:
      "Use Convex actions to securely call external APIs like OpenRouter. Store chat history and sessions in Convex tables.",
  },
  {
    title: "Model directory — OpenRouter",
    url: "https://openrouter.ai",
    snippet:
      "Browse community and premium models such as Qwen, GLM, Gemma and more with unified API.",
  },
  {
    title: "Design inspiration: Atlas / Comet UI",
    url: "https://ui.gallery",
    snippet:
      "Dark, minimal, workspace‑style chat interfaces with tabs, sidebars, and split views.",
  },
];

const SearchPanel = () => {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return sample;
    return sample.filter(
      (r) => r.title.toLowerCase().includes(q.toLowerCase()) || r.snippet.toLowerCase().includes(q.toLowerCase())
    );
  }, [q]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-zinc-800">
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the web with AI…"
            className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {results.map((r, idx) => (
          <a
            key={idx}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="block p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900"
          >
            <div className="text-zinc-100 font-medium">{r.title}</div>
            <div className="text-xs text-blue-400 truncate">{r.url}</div>
            <p className="text-sm text-zinc-400 mt-1">{r.snippet}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
