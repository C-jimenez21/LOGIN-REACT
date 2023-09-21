import { useAuth } from "../config/auth"
export default function Profile() {
  const auth = useAuth()
  function Logout (e) {
    e.preventDedault();
    auth.logout()
  }
  return (
    <>
        <div>PROFILE {auth.user.email}</div>
        <form onSubmit={Logout}>
          <button type="submit"> Salir</button>
        </form>
    </>
  )
}
