import { SignOut } from '@/components/auth-components'
import { GitProvider } from '@/context/Git'
import { SessionProvider } from 'next-auth/react'
import GitWrapper from '@/components/wrappers/GitWrapper'
import BookmarkProvider from '@/modules/bookmark/BookmarkProvider'

// Everyhting that provides a wrapper should be put here
export default function LoggedInWrapper ({ children, session }) {
  return (
    <div className="px-8 py-8">
      <main>
        {/* Header/nav */}
        <div className="row">
          <div className="flex items-center gap-2">
            <span className="hidden text-sm sm:inline-flex">
              <SignOut />
            </span>
          </div>
        </div>
        <div className="row mt-8">
          <SessionProvider session={session}>
            <GitProvider>
              <BookmarkProvider> {/* Add the BookmarkProvider here */}
                <GitWrapper session={session}>
                  {/* Main content AKA dashboard */}
                  {children}
                </GitWrapper>
              </BookmarkProvider>
            </GitProvider>
          </SessionProvider>
        </div>
      </main>
    </div>
  );
}
