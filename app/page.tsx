import { auth } from '@/auth'
import { SignIn } from '@/components/auth-components'

import LoggedInWrapper from '@/components/wrappers/LoggedInWrapper'
import Dashboard from '@/components/dashboard'

export default async function Home() {
  const session = await auth()
  if (!session?.user) return <SignIn />
  return (
    <LoggedInWrapper session={session}>
      <Dashboard />
    </LoggedInWrapper>
  )
}
