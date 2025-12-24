const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiRequest(
  path: string,
  method = "GET",
  body?: any,
  token?: string
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    throw new Error("API error")
  }

  return res.json()
}
