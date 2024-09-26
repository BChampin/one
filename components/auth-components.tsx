import { signIn, signOut } from "@/auth"
import { Button } from '@nextui-org/react'

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("gitlab")
      }}
    >
      <Button type="submit">Signin with GitLab</Button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
