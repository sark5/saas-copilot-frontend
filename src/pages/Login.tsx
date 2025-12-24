import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/auth/AuthContext"
import { apiRequest } from "@/api/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await apiRequest("/auth/login", "POST", {
        email,
        password,
      })

      login(res.access_token)
      navigate("/app")
    } catch {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

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

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Don’t have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  )
}
