type Props = {
  role: "user" | "assistant"
  text: string
}

export default function MessageBubble({ role, text }: Props) {
  const isUser = role === "user"

  return (
    <div
      className={`max-w-2xl px-4 py-3 rounded-lg mb-3 ${isUser
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted"
        }`}
    >
      {text}
    </div>
  )
}
