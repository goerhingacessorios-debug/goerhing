"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${SITE.whatsapp}?text=Ol%C3%A1!%20Tenho%20interesse%20nos%20produtos%20da%20GOERHING.`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
