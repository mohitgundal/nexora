import React, { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, Sparkles } from "lucide-react";

const AIChat = ({ project, conversation, onMessagesChange, onAIAction }) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const messagesEndRef = useRef(null);

  const messages = conversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isProcessing]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isProcessing || !conversation) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    const messagesAfterUser = [...messages, userMessage];

    onMessagesChange(messagesAfterUser);
    setMessage("");
    setIsProcessing(true);

    try {
      const aiResponse = await onAIAction(trimmedMessage);

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse || "Your requested changes have been processed.",
        createdAt: new Date().toISOString(),
      };

      onMessagesChange([...messagesAfterUser, assistantMessage]);
    } catch (error) {
      console.error("AI action failed:", error);

      onMessagesChange([
        ...messagesAfterUser,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn't apply that change. Please try describing the change differently.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="flex min-h-0 flex-col lg:h-full">
      {/* Conversation header */}
      <div className="hidden shrink-0 items-center gap-2 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3 lg:flex">
        <div className="flex size-8 items-center justify-center rounded-lg bg-purple-400/10">
          <Sparkles size={15} className="text-purple-300" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xs font-semibold text-white">Nexora AI</h2>

          <p className="truncate text-[10px] text-white/35">
            Working on {project.name}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-green-400" />
          <span className="text-[10px] text-white/35">Ready to assist</span>
        </div>
      </div>

      {/* Messages */}
      <div className="hidden min-h-0 flex-1 flex-col space-y-3 overflow-y-auto overscroll-contain px-3 py-3 sm:space-y-4 sm:px-5 sm:py-4 lg:flex">
        {messages.map((chatMessage) => (
          <div
            key={chatMessage.id}
            className={`flex gap-2.5 ${
              chatMessage.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {chatMessage.role === "assistant" && (
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
                <Bot size={14} className="text-purple-300" />
              </div>
            )}

            <div
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-xs leading-6 sm:max-w-[75%] ${
                chatMessage.role === "user"
                  ? "rounded-br-md bg-white text-black"
                  : "rounded-bl-md border border-white/10 bg-white/[0.035] text-white/75"
              }`}
            >
              {chatMessage.content}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
              <Bot size={14} className="text-purple-300" />
            </div>

            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.035] px-4 py-3">
              <span className="size-1.5 animate-pulse rounded-full bg-purple-300/70" />
              <span
                className="size-1.5 animate-pulse rounded-full bg-purple-300/70"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="size-1.5 animate-pulse rounded-full bg-purple-300/70"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-white/10 p-2 lg:p-4"
      >
        <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-2 transition focus-within:border-purple-400/40">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            placeholder={
              isProcessing
                ? "Nexora is working..."
                : "Ask Nexora to change or improve something..."
            }
            rows={2}
            disabled={isProcessing}
            className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-1.5 text-xs leading-5 text-white outline-none placeholder:text-white/30 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!message.trim() || isProcessing}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Send message"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <p className="mt-2 hidden px-1 text-[10px] text-white/25 lg:block">
          Enter to send · Shift + Enter for a new line
        </p>
      </form>
    </section>
  );
};

export default AIChat;
