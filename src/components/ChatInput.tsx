import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

type Props = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  loading: boolean
  centered?: boolean
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading,
  centered = false,
}: Props) {
  return (
    <div
      className={`flex gap-2 w-full ${centered
          ? "max-w-2xl mt-8"
          : "max-w-3xl mx-auto"
        }`}
    >
      <Input
        placeholder="Ask a support question…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <Button onClick={onSend} disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        Ask
      </Button>
    </div>
  )
}
