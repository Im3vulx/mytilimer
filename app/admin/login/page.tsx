"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Shell } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Identifiants incorrects");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--color-canvas)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 space-y-6"
        style={{ border: "1px solid var(--border-soft)", background: "var(--color-surface)" }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <Shell size={32} style={{ color: "var(--color-brand)" }} className="opacity-75" />
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--color-brand)" }}>
            Console Mytilimer
          </h1>
          <p className="text-xs opacity-50" style={{ color: "var(--color-brand)" }}>
            Accès administrateur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5 opacity-70"
              style={{ color: "var(--color-brand)" }}
            >
              Identifiant
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all focus:ring-1 focus:ring-current"
              style={{
                background: "var(--color-canvas)",
                border: "1px solid var(--border-soft)",
                color: "var(--color-brand)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5 opacity-70"
              style={{ color: "var(--color-brand)" }}
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 pr-11 text-sm outline-none transition-all focus:ring-1 focus:ring-current"
                style={{
                  background: "var(--color-canvas)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--color-brand)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-brand)" }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-50"
            style={{ background: "var(--color-brand)", color: "var(--color-canvas)" }}
          >
            <LogIn size={15} />
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
