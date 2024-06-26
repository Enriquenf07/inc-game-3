import Menu from "./menu"
import Notifications from "./notifications"

function NavBar() {

  return (
    <nav className="flex w-full bg-dark justify-between h-[7vh] py-1">
      <Menu />
      <Notifications />
    </nav>
  )
}

export { NavBar }
