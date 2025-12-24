import { useState } from "react"
import TopNav from "@/components/TopNav"
import Header from "@/components/Header"
import ChatInput from "@/components/ChatInput"
import MessageBubble from "@/components/MessageBubble"
import SourcesList from "@/components/SourcesList"
import { apiRequest } from "@/api/client"

type Message = {
  role: "user" | "assistant"
  text: string
}

export default function AppPage() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [sources, setSources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const hasChatStarted = messages.length > 0

  const ask = async () => {
    if (!query.trim()) return

    setMessages((m) => [...m, { role: "user", text: query }])
    const currentQuery = query
    setQuery("")
    setLoading(true)

    try {
      const res = await apiRequest(
        "/rag/ask",
        "POST",
        { question: currentQuery }
      )

      if (res.status === "low_context") {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text:
              "I don’t have enough information in the documentation. Please rephrase.",
          },
        ])
        setSources([])
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", text: res.answer },
        ])
        setSources(res.sources)
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Server error. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔐 AUTH NAVBAR */}
      <TopNav />

      {/* 🧠 CENTERED LANDING */}
      {!hasChatStarted && (
        <div className="flex-1 flex flex-col items-center px-4 pt-24">

          <Header />
          <ChatInput
            value={query}
            onChange={setQuery}
            onSend={ask}
            loading={loading}
            centered
          />
        </div>
      )}

      {/* 💬 CHAT UI */}
      {hasChatStarted && (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} text={m.text} />
            ))}
          </div>

          {sources.length > 0 && (
            <SourcesList sources={sources} />
          )}

          <div className="border-t p-4">
            <ChatInput
              value={query}
              onChange={setQuery}
              onSend={ask}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  )
}
