import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AnswerCard({ answer }: { answer: string }) {
  return (
    <Card>
      <CardHeader className="font-semibold">Answer</CardHeader>
      <CardContent className="text-sm whitespace-pre-line">
        {answer}
      </CardContent>
    </Card>
  )
}
