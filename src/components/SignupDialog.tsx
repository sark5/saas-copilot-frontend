import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { apiRequest } from "@/api/client"

export default function SignupDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSignup() {
    try {
      await apiRequest("/auth/signup", "POST", {
        email,
        password,
      })
      onClose()
    } catch {
      setError("Signup failed")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Sign Up</DialogHeader>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleSignup}>Create Account</Button>
      </DialogContent>
    </Dialog>
  )
}
