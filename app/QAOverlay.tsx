"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface QAComment {
  id: string;
  x: number;
  y: number;
  selector: string;
  elementLabel: string;
  text: string;
  timestamp: number;
  resolved: boolean;
}

const STORAGE_KEY = "dockpops_qa_comments";

function getSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;
  const parts: string[] = [];
  let current: HTMLElement | null = el;
  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    if (current.className && typeof current.className === "string") {
      const cls = current.className
        .split(" ")
        .filter((c) => c && !c.startsWith("qa-"))
        .slice(0, 2)
        .join(".");
      if (cls) selector += `.${cls}`;
    }
    parts.unshift(selector);
    current = current.parentElement;
  }
  return parts.join(" > ");
}

function getLabel(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();
  const text = el.textContent?.trim().slice(0, 50) || "";
  if (el.tagName === "IMG") return `<img> ${(el as HTMLImageElement).alt || (el as HTMLImageElement).src.split("/").pop()}`;
  if (text) return `<${tag}> "${text}${(el.textContent?.trim().length ?? 0) > 50 ? "…" : ""}"`;
  return `<${tag}>`;
}

export default function QAOverlay() {
  const [active, setActive] = useState(false);
  const [comments, setComments] = useState<QAComment[]>([]);
  const [pendingPos, setPendingPos] = useState<{
    x: number;
    y: number;
    selector: string;
    elementLabel: string;
  } | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [highlightLabel, setHighlightLabel] = useState("");
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load comments
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setComments(JSON.parse(stored));
    } catch {}
  }, []);

  // Save comments
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  // Ctrl+. toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === ".") {
        e.preventDefault();
        setActive((prev) => !prev);
        setPendingPos(null);
        setShowList(false);
        setHighlightRect(null);
        hoveredElRef.current = null;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when pending
  useEffect(() => {
    if (pendingPos && inputRef.current) {
      inputRef.current.focus();
    }
  }, [pendingPos]);

  // Highlight on hover
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!active || pendingPos) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-qa-ui]")) {
        setHighlightRect(null);
        hoveredElRef.current = null;
        return;
      }
      if (target !== hoveredElRef.current) {
        hoveredElRef.current = target;
        const rect = target.getBoundingClientRect();
        setHighlightRect(rect);
        setHighlightLabel(getLabel(target));
      }
    },
    [active, pendingPos]
  );

  // Click to place comment
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!active || pendingPos) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-qa-ui]")) return;

      e.preventDefault();
      e.stopPropagation();

      setPendingPos({
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
        selector: getSelector(target),
        elementLabel: getLabel(target),
      });
      setInputValue("");
      setHighlightRect(null);
      hoveredElRef.current = null;
    },
    [active, pendingPos]
  );

  useEffect(() => {
    if (active) {
      document.addEventListener("mousemove", handleMouseMove, true);
      document.addEventListener("click", handleClick, true);
      document.body.style.cursor = "crosshair";
      return () => {
        document.removeEventListener("mousemove", handleMouseMove, true);
        document.removeEventListener("click", handleClick, true);
        document.body.style.cursor = "";
      };
    } else {
      document.body.style.cursor = "";
    }
  }, [active, handleClick, handleMouseMove]);

  const addComment = () => {
    if (!pendingPos || !inputValue.trim()) return;
    const comment: QAComment = {
      id: Date.now().toString(36),
      x: pendingPos.x,
      y: pendingPos.y,
      selector: pendingPos.selector,
      elementLabel: pendingPos.elementLabel,
      text: inputValue.trim(),
      timestamp: Date.now(),
      resolved: false,
    };
    setComments((prev) => [...prev, comment]);
    setPendingPos(null);
    setInputValue("");
  };

  const toggleResolved = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c))
    );
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const exportComments = () => {
    const unresolved = comments.filter((c) => !c.resolved);
    const text = unresolved
      .map(
        (c, i) =>
          `${i + 1}. ${c.text}\n   Element: ${c.elementLabel}\n   Selector: ${c.selector}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  if (!active && comments.length === 0) return null;

  const unresolvedCount = comments.filter((c) => !c.resolved).length;

  return (
    <>
      {/* Highlight overlay on hovered element */}
      {active && highlightRect && !pendingPos && (
        <div
          data-qa-ui="true"
          className="fixed z-[9997] pointer-events-none border-2 border-red-500 bg-red-500/10 rounded-sm transition-all duration-75"
          style={{
            left: highlightRect.left,
            top: highlightRect.top,
            width: highlightRect.width,
            height: highlightRect.height,
          }}
        >
          <span className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap max-w-[300px] truncate">
            {highlightLabel}
          </span>
        </div>
      )}

      {/* Pin markers (always visible if comments exist) */}
      {comments
        .filter((c) => !c.resolved)
        .map((c, i) => (
          <div
            key={c.id}
            data-qa-ui="true"
            className="fixed z-[9998] -translate-x-1/2 -translate-y-full pointer-events-auto cursor-pointer"
            style={{
              left: c.x - window.scrollX,
              top: c.y - window.scrollY,
            }}
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white">
              {i + 1}
            </div>
            {hoveredId === c.id && (
              <div className="absolute left-1/2 -translate-x-1/2 top-8 bg-zinc-900 text-white text-xs rounded-lg px-3 py-2 max-w-[280px] shadow-xl border border-white/20 whitespace-pre-wrap">
                <p className="text-white/40 text-[10px] font-mono mb-1">{c.elementLabel}</p>
                {c.text}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => toggleResolved(c.id)}
                    className="text-green-400 hover:text-green-300 text-[10px] font-semibold"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => deleteComment(c.id)}
                    className="text-red-400 hover:text-red-300 text-[10px] font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

      {/* Active overlay UI */}
      {active && (
        <>
          {/* Top bar */}
          <div
            data-qa-ui="true"
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-3"
          >
            <span>QA Mode</span>
            <span className="text-white/70">Click any element to comment</span>
            {unresolvedCount > 0 && (
              <button
                onClick={() => setShowList(!showList)}
                className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
              >
                {unresolvedCount} note{unresolvedCount !== 1 ? "s" : ""}
              </button>
            )}
            {unresolvedCount > 0 && (
              <button
                onClick={exportComments}
                className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
              >
                Copy all
              </button>
            )}
            <button
              onClick={() => {
                setComments(prev => prev.map(c => ({ ...c, resolved: true })));
              }}
              className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
            >
              Hide all
            </button>
            <button
              onClick={() => {
                if (confirm("Clear all QA notes?")) {
                  setComments([]);
                  setShowList(false);
                }
              }}
              className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={() => {
                setActive(false);
                setPendingPos(null);
                setShowList(false);
                setHighlightRect(null);
              }}
              className="bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors"
            >
              Ctrl+. to close
            </button>
          </div>

          {/* Comment input popover */}
          {pendingPos && (
            <div
              data-qa-ui="true"
              className="fixed z-[9999] bg-zinc-900 border border-white/20 rounded-xl shadow-2xl p-3 w-72"
              style={{
                left: Math.min(
                  pendingPos.x - window.scrollX,
                  window.innerWidth - 300
                ),
                top: pendingPos.y - window.scrollY + 8,
              }}
            >
              <p className="text-white/40 text-[10px] font-mono mb-2 truncate">
                {pendingPos.elementLabel}
              </p>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                  if (e.key === "Escape") setPendingPos(null);
                }}
                placeholder="Leave a note... (Enter to save, Esc to cancel)"
                className="w-full bg-zinc-800 text-white text-sm rounded-lg px-3 py-2 resize-none outline-none border border-white/10 focus:border-red-500/50 placeholder:text-white/30"
                rows={3}
              />
              <div className="flex justify-end items-center mt-2 gap-2">
                <button
                  onClick={() => setPendingPos(null)}
                  className="text-white/40 hover:text-white/60 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={addComment}
                  className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-red-400"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Comment list panel */}
          {showList && (
            <div
              data-qa-ui="true"
              className="fixed top-24 right-4 z-[9999] bg-zinc-900 border border-white/20 rounded-xl shadow-2xl p-4 w-80 max-h-[70vh] overflow-y-auto"
            >
              <h3 className="text-white font-semibold text-sm mb-3">
                QA Notes ({unresolvedCount})
              </h3>
              {comments
                .filter((c) => !c.resolved)
                .map((c, i) => (
                  <div
                    key={c.id}
                    className="mb-3 pb-3 border-b border-white/10 last:border-0"
                  >
                    <div className="flex items-start gap-2">
                      <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-white/70 text-sm">{c.text}</p>
                        <p className="text-white/20 text-[10px] font-mono mt-1">
                          {c.elementLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 ml-7">
                      <button
                        onClick={() => toggleResolved(c.id)}
                        className="text-green-400 hover:text-green-300 text-[10px] font-semibold"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="text-red-400 hover:text-red-300 text-[10px] font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {comments.some((c) => c.resolved) && (
                <>
                  <h4 className="text-white/30 text-xs mt-4 mb-2">Resolved</h4>
                  {comments
                    .filter((c) => c.resolved)
                    .map((c) => (
                      <div
                        key={c.id}
                        className="mb-2 flex items-start gap-2 opacity-50"
                      >
                        <span className="text-green-400 text-xs mt-0.5">
                          ✓
                        </span>
                        <p className="text-white/40 text-xs line-through">
                          {c.text}
                        </p>
                      </div>
                    ))}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
