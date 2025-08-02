import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import githubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from "@/models/User"
import Payment from "@/models/Payment"
export const authOptions=NextAuth({
  providers: [
    // OAuth authentication providers...
    githubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
  async signIn({ user, account }) {
  if (account.provider === "github") {
    const client = await mongoose.connect("mongodb://localhost:27017/fuel")

    const currentuser = await User.findOne({ email: user.email })

    if (!currentuser) {
      const newUser = new User({
        email: user.email,
        username: user.email.split("@")[0],
      })
      await newUser.save()
    }
    return true
  }
},
async session({ session, user, token }) {
      const db=await User.findOne({email:session.user.email})
      session.user.name=db.username
      return session
    },

}
})
export {authOptions as GET , authOptions as POST }