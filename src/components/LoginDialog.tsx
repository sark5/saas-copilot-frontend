import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { apiRequest } from "@/api/client"
import { useAuth } from "@/auth/AuthContext"

export default function LoginDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin() {
    try {
      const res = await apiRequest("/auth/login", "POST", {
        email,
        password,
      })
      login(res.access_token)
      onClose()
    } catch {
      setError("Invalid credentials")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Login</DialogHeader>

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

        <Button onClick={handleLogin}>Login</Button>
      </DialogContent>
    </Dialog>
  )
}
