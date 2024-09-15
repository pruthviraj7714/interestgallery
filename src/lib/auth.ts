import { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";
import prisma from "./db";

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

interface CustomUser extends NextAuthUser {
  id: string;
  email: string;
  username: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found with the provided credentials");
        }

        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return { id: user.id.toString(), username :user.username, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "auth/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.email = user.email;
        token.username = (user as CustomUser).username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        (session as CustomSession).user = {
          id: token.id as string,
          email: token.email as string,
          username: token.username as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;