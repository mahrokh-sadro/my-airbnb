import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined; // Change `var` to `let`
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
