import { auth } from '@/auth'
import { SignIn, SignOut } from '@/components/auth-components'
import Providers from '@/app/providers'

import { GitProvider } from '@/context/Git'
import { SessionProvider } from 'next-auth/react'
import GitWrapper from '@/modules/git/GitWrapper'
import BookmarkProvider from '@/modules/bookmark/BookmarkProvider'
import WeatherProvider from '@/modules/weather/WeatherProvider'
import HabitProvider from '@/modules/habit/HabitProvider'

import { Navbar, NavbarContent, NavbarItem, Link } from '@nextui-org/react'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Ensure user is connected
  const session = await auth()
  if (!session?.user) return <SignIn />

  const navbarLinks = [
    { label: 'Home', href: '/app' },
    { label: 'Bookmarks', href: '/app/bookmarks' },
    { label: 'Habits', href: '/app/habits' },
  ]

  return (
    <div>
      <Navbar>
        <NavbarContent className="sm:flex gap-4" justify="center">
          { navbarLinks.map((link, index) => (
            <NavbarItem key={index}>
              <Link href={link.href}>
                {link.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <SignOut />
        </NavbarContent>
      </Navbar>
      <section>
        <Providers>
          <div className="px-8 py-8">
            <main>
              <div className="row mt-8">
                <SessionProvider session={session}>
                  <GitProvider>
                    <BookmarkProvider>
                          <HabitProvider>
                      <GitWrapper session={session}>
                        <WeatherProvider>
                            {/* Main content AKA page */}
                            {children}
                        </WeatherProvider>
                      </GitWrapper>
                          </HabitProvider>
                    </BookmarkProvider>
                  </GitProvider>
                </SessionProvider>
              </div>
            </main>
          </div>
        </Providers>
      </section>
    </div>
  );
}
