"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, Check, AlertTriangle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!supabaseConfigured || !supabase) {
      setError("Cadastro indisponível: Supabase não configurado.");
      return;
    }

    setSubmitting(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) {
        setError(traduzErro(error.message));
      } else if (data.session) {
        // já logado (confirmação de e-mail desativada)
        router.push("/");
        router.refresh();
      } else {
        setInfo(
          "Conta criada! Verifique seu e-mail para confirmar o cadastro e depois faça login.",
        );
        setMode("login");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError("E-mail ou senha inválidos.");
      } else {
        router.push("/");
        router.refresh();
      }
    }
    setSubmitting(false);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-8 shadow-premium">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        {!supabaseConfigured && (
          <div className="mb-5 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
            <AlertTriangle size={15} className="mt-0.5 shrink-0" />
            Cadastro/login indisponível: configure o Supabase para ativar contas
            de cliente.
          </div>
        )}

        <div className="mb-6 flex rounded-full bg-neutral-100 p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError("");
                setInfo("");
              }}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === m ? "bg-white text-brand-orange shadow" : "text-neutral-500"
              }`}
            >
              {m === "login" ? "Entrar" : "Cadastrar"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-3.5 text-neutral-400" />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                className={field}
              />
            </div>
          )}
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-3.5 text-neutral-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className={field}
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-3.5 text-neutral-400" />
            <input
              type={showPass ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha (mín. 6 caracteres)"
              className={field}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-4 top-3.5 text-neutral-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {info && (
            <p className="flex items-start gap-1.5 text-sm text-emerald-600">
              <Check size={16} className="mt-0.5 shrink-0" /> {info}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3.5 disabled:opacity-60"
          >
            {submitting
              ? "Aguarde..."
              : mode === "login"
                ? "Entrar"
                : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Ao continuar você concorda com os{" "}
          <Link href="/sobre" className="text-brand-orange">
            Termos de Uso
          </Link>{" "}
          da GOERHING.
        </p>
      </div>
    </div>
  );
}

function traduzErro(msg: string): string {
  if (msg.includes("already registered") || msg.includes("already been"))
    return "Este e-mail já está cadastrado. Tente fazer login.";
  if (msg.includes("Password should be"))
    return "A senha deve ter pelo menos 6 caracteres.";
  return "Não foi possível concluir. Verifique os dados e tente novamente.";
}
