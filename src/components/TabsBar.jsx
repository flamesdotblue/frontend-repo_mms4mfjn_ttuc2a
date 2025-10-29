import React from "react";
import { Plus, Trash2 } from "lucide-react";

const TabsBar = ({ tabs, activeId, onAdd, onSelect, onClose }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent py-2 px-2 border-b border-zinc-800">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors whitespace-nowrap ${
            activeId === t.id
              ? "bg-zinc-800/60 border-zinc-700 text-zinc-100"
              : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span className="text-sm font-medium">{t.title}</span>
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              onClose(t.id);
            }}
            className="w-4 h-4 text-zinc-500 hover:text-red-400 hidden sm:block"
          />
        </button>
      ))}
      <button
        onClick={onAdd}
        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">New Tab</span>
      </button>
    </div>
  );
};

export default TabsBar;
