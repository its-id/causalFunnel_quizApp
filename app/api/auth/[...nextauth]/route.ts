import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {},
      authorize(credentials) {
        const {name, email}: any = credentials;
        //for now, we don't need to check the credentials
        const user = {
          id: 1,
          name: name || 'John Doe',
          email: email || 'john@doe.com',
        };
        return user as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as any,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
