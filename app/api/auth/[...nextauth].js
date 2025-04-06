import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials");
    
            const user = await prismadb.user.findUnique({
                where: { email: credentials.email }
            })
    
            if (!user || !user.hashedPassword) throw new Error("Invalid credentials");
    
            const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            )
    
            if (!isCorrectPassword) return null
    
            return user
            }
        })
    ],
    pages: {
        signIn: "/",
        error: "/",
        verifyRequest: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});
