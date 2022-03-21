import axios from 'axios';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { isAdminUser } from '../../../src/utils/check_admin_user';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      return isAdminUser(account.providerAccountId);
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
