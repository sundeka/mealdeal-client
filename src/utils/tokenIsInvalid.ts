import { jwtDecode, JwtPayload } from "jwt-decode";

export function tokenIsInvalid() {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const expire = decoded.exp
        const now = Math.floor(Date.now() / 1000)
        return (now-expire) > 1800 // Token is valid if it was acquired less than 30 minutes ago
      }
    } catch (error) {
      console.error("Error parsing token: " + error)
    }
  }
  return true;
}