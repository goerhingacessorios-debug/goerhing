"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ nome: "", telefone: "", email: "", mensagem: "" });
    setTimeout(() => setSent(false), 4000);
  }

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nome</label>
          <input
            required
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Seu nome completo"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Telefone</label>
          <input
            required
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            placeholder="(00) 00000-0000"
            className={field}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">E-mail</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="seu@email.com"
          className={field}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Mensagem</label>
        <textarea
          required
          rows={5}
          value={form.mensagem}
          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          placeholder="Como podemos ajudar?"
          className={`${field} resize-none`}
        />
      </div>
      <button type="submit" className="btn-primary w-full py-3.5">
        {sent ? (
          <>
            <Check size={18} /> Mensagem enviada!
          </>
        ) : (
          <>
            <Send size={18} /> Enviar mensagem
          </>
        )}
      </button>
    </form>
  );
}
