type Props = {
  sources: {
    title: string
    score: number
    chunk_text: string
  }[]
}

export default function SourcesList({ sources }: Props) {
  return (
    <div className="mt-4 max-w-3xl mx-auto">
      <h4 className="font-medium mb-2">Sources</h4>
      <ul className="space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="border rounded p-2 text-sm">
            <div className="font-semibold">{s.title}</div>
            <div className="text-muted-foreground">
              Score: {s.score.toFixed(2)}
            </div>
            <div className="text-xs mt-1">{s.chunk_text}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
