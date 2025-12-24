import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "@/api/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await apiRequest("/auth/signup", "POST", {
        email,
        password,
      })

      navigate("/login")
    } catch {
      setError("Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button className="w-full" onClick={handleSignup}>
          Create Account
        </Button>
      </div>
    </div>
  )
}
