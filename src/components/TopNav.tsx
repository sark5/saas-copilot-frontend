import { Button } from "@/components/ui/button"
import { useAuth } from "@/auth/AuthContext"
import { useNavigate } from "react-router-dom"

export default function TopNav() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex justify-end items-center px-6 py-4 border-b">
      {!token ? (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => {
            logout()
            navigate("/login")
          }}
        >
          Logout
        </Button>
      )}
    </div>
  )
}
