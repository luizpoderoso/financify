import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { usersTable } from "@/lib/db/schema";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, schema),
  session: { strategy: "jwt" },
  callbacks: {
    // O callback `jwt` é chamado sempre que um JWT é criado ou atualizado.
    // O objeto `user` aqui é o que a função `authorize` retornou.
    async jwt({ token, user }) {
      if (user) {
        // Na primeira vez que o usuário faz login, adicionamos o ID e o username ao token.
        token.id = user.id;
      }
      return token;
    },

    // O callback `session` é chamado sempre que a sessão é acessada.
    // Ele usa os dados do `token` (que acabamos de modificar) para construir o objeto da sessão.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        try {
          const [user] = await db
            .select()
            .from(usersTable)
            .limit(1)
            .where(eq(usersTable.email, credentials.email as string));

          if (!user || !user.hashedPassword) {
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword,
          );

          if (isPasswordMatch) {
            // Retorna um objeto seguro para a sessão, sem a senha
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
            };
          }

          return null;
        } catch (error) {
          console.error("[Authorize] Ocorreu um erro inesperado:", error);
          return null;
        }
      },
    }),
  ],
});
