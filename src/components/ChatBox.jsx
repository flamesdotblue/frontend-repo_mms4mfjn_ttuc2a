import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";

const Message = ({ role, content }) => (
  <div className={`w-full flex ${role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow ${
        role === "user"
          ? "bg-amber-500/10 border border-amber-500/30 text-amber-100"
          : "bg-zinc-900 border border-zinc-800 text-zinc-100"
      }`}
    >
      {content}
    </div>
  </div>
);

const ChatBox = ({ messages, onSend }) => {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const placeholder = useMemo(
    () => [
      {
        role: "assistant",
        content:
          "Ask me anything. Use the search panel for web context. Switch models from the left sidebar.",
      },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    setSending(true);
    await onSend(trimmed);
    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {(messages.length ? messages : placeholder).map((m, idx) => (
          <Message key={idx} role={m.role} content={m.content} />
        ))}
        {sending && (
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating response…
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message SAKI…"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 bg-amber-500 text-black font-medium px-3 py-2 rounded-md hover:bg-amber-400 disabled:opacity-60"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
