import React, { useState } from "react";
import { ArrowUp, Bot, Sparkles } from "lucide-react";

const AIChat = ({ project, onAIAction }) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: `Your initial website for ${project.name} is ready. You can ask me to change content, redesign sections, add features, or improve the experience.`,
    },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isProcessing) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setMessage("");
    setIsProcessing(true);

    try {
      const aiResponse = await onAIAction(trimmedMessage);

      if (aiResponse) {
        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: aiResponse,
          },
        ]);
      }
    } catch (error) {
      console.error("AI action failed:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn't apply that change. Please try describing the change differently.",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="flex h-full min-h-0 flex-col border-r border-white/10">

      {/* Header */}

      <div className="border-b border-white/10 px-4 py-4">

        <div className="flex items-center gap-2">

          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-400/10">
            <Sparkles className="size-4 text-purple-300" />
          </div>

          <div>
            <h2 className="text-sm font-medium">
              Nexora AI
            </h2>

            <p className="mt-0.5 text-xs text-white/30">
              Modify your website with natural language
            </p>
          </div>

        </div>

      </div>


      {/* Messages */}

      <div className="flex-1 space-y-4 overflow-y-auto p-4">

        {messages.map((chatMessage) => (

          <div
            key={chatMessage.id}
            className={`flex gap-3 ${
              chatMessage.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {chatMessage.role === "assistant" && (

              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">

                <Bot className="size-4 text-purple-300" />

              </div>

            )}


            <div
              className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-6 ${
                chatMessage.role === "user"
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/[0.03] text-white/55"
              }`}
            >
              {chatMessage.content}
            </div>

          </div>

        ))}


        {isProcessing && (

          <div className="flex gap-3">

            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
              <Bot className="size-4 text-purple-300" />
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

              <span className="size-1.5 animate-pulse rounded-full bg-white/40" />

              <span
                className="size-1.5 animate-pulse rounded-full bg-white/40"
                style={{ animationDelay: "150ms" }}
              />

              <span
                className="size-1.5 animate-pulse rounded-full bg-white/40"
                style={{ animationDelay: "300ms" }}
              />

            </div>

          </div>

        )}

      </div>


      {/* Input */}

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 p-3"
      >

        <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 focus-within:border-purple-400/40">

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            placeholder={
              isProcessing
                ? "Nexora is working..."
                : "Ask Nexora to change something..."
            }
            rows={2}
            disabled={isProcessing}
            className="min-h-12 flex-1 resize-none bg-transparent px-2 py-1 text-xs leading-5 text-white outline-none placeholder:text-white/25 disabled:opacity-50"
          />


          <button
            type="submit"
            disabled={!message.trim() || isProcessing}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>

        </div>

        <p className="mt-2 px-1 text-[10px] text-white/20">
          Press Enter to send · Shift + Enter for a new line
        </p>

      </form>

    </section>
  );
};

export default AIChat;