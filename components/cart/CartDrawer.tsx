"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/data";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useStore();

  function finalizarPedidoWhatsApp() {
    const linhas = cart.map(
      (item) =>
        `• ${item.quantity}x ${item.product.name} — ${formatPrice(
          item.product.price * item.quantity,
        )}`,
    );
    const mensagem =
      `Olá! Gostaria de finalizar meu pedido na GOERHING Acessórios:\n\n` +
      `${linhas.join("\n")}\n\n` +
      `*Total: ${formatPrice(cartTotal)}*`;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      mensagem,
    )}`;
    window.open(url, "_blank");
    setCartOpen(false);
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag size={20} className="text-brand-orange" />
                Carrinho ({cartCount})
              </h2>
              <button onClick={() => setCartOpen(false)} aria-label="Fechar">
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag size={48} className="text-neutral-300" />
                <p className="text-neutral-500">Seu carrinho está vazio.</p>
                <button onClick={() => setCartOpen(false)} className="btn-primary">
                  Continuar comprando
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-xl border border-neutral-100 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/produto/${item.product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-brand-orange"
                        >
                          {item.product.name}
                        </Link>
                        <span className="mt-1 text-sm font-bold text-brand-orange">
                          {formatPrice(item.product.price)}
                        </span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-neutral-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-400 transition-colors hover:text-red-500"
                            aria-label="Remover"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-neutral-100 p-5">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-brand-orange">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <button
                    onClick={finalizarPedidoWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1ebe57] active:scale-95"
                  >
                    <FaWhatsapp size={18} />
                    Finalizar Compra
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-outline w-full"
                  >
                    Continuar comprando
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
