import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user?.email) {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email.toLowerCase() });
          
          if (!existingUser) {
            await User.create({
              name: user.name || "",
              email: user.email.toLowerCase(),
              image: user.image || "",
            });
          } else {
            // Keep name and image updated from Google
            let needsSave = false;
            if (user.name && existingUser.name !== user.name) {
              existingUser.name = user.name;
              needsSave = true;
            }
            if (user.image && existingUser.image !== user.image) {
              existingUser.image = user.image;
              needsSave = true;
            }
            if (needsSave) {
              await existingUser.save();
            }
          }
          return true;
        } catch (error) {
          console.error("❌ Error persisting user to MongoDB:", error);
          // Allow sign in even if DB connection fails temporarily
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (token?.email) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email.toLowerCase() });
          if (dbUser) {
            token.userId = dbUser._id.toString();
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token?.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
});
