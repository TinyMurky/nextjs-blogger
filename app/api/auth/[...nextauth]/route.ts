import NextAuth, { Account, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import prisma from "@/libs/db"


const handler =  NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({token}) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email
        }
      })

      token.id = dbUser?.id
      token.name = dbUser?.name || token.name
      delete token.picture
      delete token.sub
      return token
    },
  
    async session({session, token}) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      return session
    },

    async signIn({ user, account, profile, email, credentials }): Promise<boolean | string> {
      if (account?.provider === 'github' && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })
        if (dbUser) {
          return true
        }
      }
      return false
    },
  }
})

export { handler as GET, handler as POST }