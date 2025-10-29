import React from "react";
import { Settings, Sparkles, Search } from "lucide-react";

const models = [
  { id: "gpt-oss-20b", label: "GPT OSS 20B" },
  { id: "qwen3-coder", label: "Qwen3 Coder" },
  { id: "glm-4.5-air", label: "GLM 4.5 Air" },
  { id: "gemma-3n-e2b-it", label: "Gemma 3n e2b" },
];

const Sidebar = ({ selectedModel, onModelChange, showSearch, onToggleSearch }) => {
  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-zinc-800 bg-zinc-950/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40 text-zinc-200">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-medium">Models</span>
        </div>
        <div className="mt-3 space-y-2">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => onModelChange(m.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedModel === m.id
                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  : "hover:bg-zinc-900"
              }`}
            >
              <div className="text-sm font-medium">{m.label}</div>
              <div className="text-xs text-zinc-400">{m.id}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Search Panel</span>
          </div>
          <button
            onClick={onToggleSearch}
            className={`text-xs px-2 py-1 rounded border ${
              showSearch
                ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
          >
            {showSearch ? "On" : "Off"}
          </button>
        </div>
        <p className="text-xs text-zinc-400 mt-2">
          Enable an AI‑assisted web search side panel alongside the chat.
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-zinc-400" />
          <span className="font-medium">Settings</span>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <label htmlFor="temp" className="text-zinc-400">Temperature</label>
            <input id="temp" type="range" min={0} max={2} step={0.1} defaultValue={0.7}
              className="w-full accent-amber-400" />
            <div className="text-xs text-zinc-500">Affects creativity of responses.</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Memory</span>
            <span className="text-zinc-300">Local</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
