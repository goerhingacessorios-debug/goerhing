export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function installment(value: number, parts = 12): string {
  const each = value / parts;
  return `${parts}x de ${each.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })} sem juros`;
}
