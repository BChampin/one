import NextAuth, { DefaultSession } from "next-auth"
import type { Provider } from "next-auth/providers"
import GitLab from "next-auth/providers/gitlab"

const providers: Provider[] = [
  GitLab({
    authorization: 'https://gitlab.com/oauth/authorize?scope=api read_user'
  })
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitLab({
      authorization: 'https://gitlab.com/oauth/authorize?scope=api read_user'
    })
  ],
  callbacks: {
    async jwt({ token, trigger, account }) {
      if (trigger === 'signIn' && account?.access_token) token.accessToken = account.access_token
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken
      return session
    },
  },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      token?: accessToken; // Oauth access token
    } & DefaultSession["user"];
  }
}
