import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

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
      const ids = process.env.DISCORD_ADMIN_IDS?.split(`,`);
      if (ids === undefined) return true;
      return ids.includes(account.providerAccountId);
    },
  },
});
