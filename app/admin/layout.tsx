import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminGate from "@/components/admin/AdminGate";

export const metadata: Metadata = {
  title: "Painel Administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGate>
      <AdminShell>{children}</AdminShell>
    </AdminGate>
  );
}
