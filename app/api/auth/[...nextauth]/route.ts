import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import prisma from "@/libs/db"

export default NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({token, user}) {

      if (user?.email) {
        token.user.email = user.email
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })

        token.user.id = dbUser?.id
        token.user.name = dbUser?.name
      }
      
      return token
    },
  
    async session({session, token}) {
      session.user.id = token.user.id
      session.user.email = token.user.email
      session.user.name = token.user.name
      
      return session
    }
  }
})