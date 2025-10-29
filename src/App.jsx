import React, { useEffect, useMemo, useState } from "react";
import HeroSpline from "./components/HeroSpline";
import Sidebar from "./components/Sidebar";
import TabsBar from "./components/TabsBar";
import ChatBox from "./components/ChatBox";
import SearchPanel from "./components/SearchPanel";

const defaultTabs = () => [
  { id: crypto.randomUUID(), title: "New Chat", messages: [] },
];

const storageKey = "saki-ai-browser-state-v1";

function App() {
  const [model, setModel] = useState("qwen3-coder");
  const [showSearch, setShowSearch] = useState(true);
  const [tabs, setTabs] = useState(defaultTabs);
  const [activeId, setActiveId] = useState(() => tabs[0]?.id);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.tabs?.length) {
          setTabs(parsed.tabs);
          setActiveId(parsed.activeId ?? parsed.tabs[0].id);
        }
        if (parsed?.model) setModel(parsed.model);
        if (typeof parsed?.showSearch === "boolean") setShowSearch(parsed.showSearch);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const state = { model, tabs, activeId, showSearch };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [model, tabs, activeId, showSearch]);

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeId) ?? tabs[0],
    [tabs, activeId]
  );

  const addTab = () => {
    const newTab = { id: crypto.randomUUID(), title: `Tab ${tabs.length + 1}`, messages: [] };
    const next = [...tabs, newTab];
    setTabs(next);
    setActiveId(newTab.id);
  };

  const selectTab = (id) => setActiveId(id);

  const closeTab = (id) => {
    if (tabs.length === 1) {
      // reset single tab
      const reset = { ...tabs[0], title: "New Chat", messages: [] };
      setTabs([reset]);
      setActiveId(reset.id);
      return;
    }
    const idx = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (activeId === id) {
      const fallback = next[Math.max(0, idx - 1)]?.id ?? next[0]?.id;
      setActiveId(fallback);
    }
  };

  const sendMessage = async (text) => {
    // Add user message
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTab.id
          ? { ...t, messages: [...t.messages, { role: "user", content: text, ts: Date.now() }] }
          : t
      )
    );

    // Simulated assistant response (stub). Replace with Convex action call in production.
    const fake = `Model: ${model}\n\nI read: "${text}". This is a local demo response. Connect your Convex action to OpenRouter for live answers.`;
    await new Promise((r) => setTimeout(r, 500));

    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTab.id
          ? {
              ...t,
              messages: [...t.messages, { role: "assistant", content: fake, ts: Date.now() }],
            }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar
          selectedModel={model}
          onModelChange={setModel}
          showSearch={showSearch}
          onToggleSearch={() => setShowSearch((v) => !v)}
        />

        <main className="flex-1 flex flex-col">
          <div className="p-3 md:p-4"><HeroSpline /></div>
          <div className="px-2 md:px-4">
            <TabsBar tabs={tabs} activeId={activeId} onAdd={addTab} onSelect={selectTab} onClose={closeTab} />
          </div>
          <div className="flex-1 grid grid-cols-1 gap-0 md:gap-4 p-2 md:p-4" style={{ gridTemplateColumns: showSearch ? "1fr 360px" : "1fr" }}>
            <section className="border border-zinc-800 rounded-lg bg-zinc-950/40 overflow-hidden min-h-[320px]">
              <ChatBox messages={activeTab?.messages ?? []} onSend={sendMessage} />
            </section>
            {showSearch && (
              <aside className="hidden md:block border border-zinc-800 rounded-lg bg-zinc-950/40 overflow-hidden min-h-[320px]">
                <SearchPanel />
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
