"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-8 shadow-premium">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="mb-6 flex rounded-full bg-neutral-100 p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === m ? "bg-white text-brand-orange shadow" : "text-neutral-500"
              }`}
            >
              {m === "login" ? "Entrar" : "Cadastrar"}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          {mode === "signup" && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-3.5 text-neutral-400" />
              <input placeholder="Nome completo" className={field} />
            </div>
          )}
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-3.5 text-neutral-400" />
            <input type="email" placeholder="E-mail" className={field} />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-3.5 text-neutral-400" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Senha"
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

          {mode === "login" && (
            <div className="text-right">
              <Link href="#" className="text-xs font-medium text-brand-orange">
                Esqueceu a senha?
              </Link>
            </div>
          )}

          <button type="submit" className="btn-primary w-full py-3.5">
            {mode === "login" ? "Entrar" : "Criar conta"}
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
