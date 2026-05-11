import { defineConfig } from "prisma/config";

// Prisma CLI (migrate/generate) ne charge pas toujours `.env.local`.
// On charge ici manuellement le fichier `.env.local` pour s'assurer que
// `DATABASE_URL` est disponible pendant les commandes.
import fs from "node:fs";
import path from "node:path";

function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (!fs.existsSync(envPath)) return;

    const content = fs.readFileSync(envPath, "utf8");
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const rawValue = trimmed.slice(eqIdx + 1).trim();
      if (!key) continue;
      // Ne surcharge pas si deja present dans le process.env.
      if (process.env[key] === undefined) {
        const value = rawValue.replace(/^"(.*)"$/, "$1");
        process.env[key] = value;
      }
    }
  } catch {
  }
}

loadEnvLocal();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});

