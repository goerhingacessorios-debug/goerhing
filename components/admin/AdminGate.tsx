"use client";

import { useEffect, useState } from "react";
import { Lock, Mail, LogOut, AlertTriangle } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import Logo from "@/components/ui/Logo";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Sem Supabase configurado → modo demonstração (alterações não são salvas)
  if (!supabaseConfigured) {
    return (
      <>
        <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 lg:px-8">
          <AlertTriangle size={14} />
          Modo demonstração — configure o Supabase para salvar as alterações de
          verdade.
        </div>
        {children}
      </>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-500">
        Carregando...
      </div>
    );
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("E-mail ou senha inválidos.");
    setSubmitting(false);
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-neutral-100 bg-white p-8 shadow-premium"
        >
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <h1 className="text-center text-lg font-bold">Painel Administrativo</h1>
          <p className="mb-6 mt-1 text-center text-sm text-neutral-500">
            Faça login para gerenciar a loja
          </p>
          <div className="space-y-3">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-3.5 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full rounded-xl border border-neutral-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-orange"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-3.5 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full rounded-xl border border-neutral-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-orange"
              />
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-5 w-full py-3.5 disabled:opacity-60"
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => supabase?.auth.signOut()}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-brand-black px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-brand-graphite"
      >
        <LogOut size={14} /> Sair
      </button>
      {children}
    </div>
  );
}
