import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Instanciation lazy : evite que `next build` ne plante si DATABASE_URL n'est pas defini localement.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL manquant (configuration requise pour Prisma).");
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });

  const client = new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

  globalForPrisma.prisma = client;
  return client;
}

