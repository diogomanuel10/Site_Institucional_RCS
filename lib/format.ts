const TZ = "Europe/Lisbon";

/** Data longa em pt-PT, ex.: "sábado, 12 de julho". */
export function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(new Date(iso));
}

/** Data curta, ex.: "12 jul". */
export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "short",
    timeZone: TZ,
  }).format(new Date(iso));
}

/** Hora, ex.: "18:00". */
export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(iso));
}

/** Preço em euros, ex.: "35,00 €". */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
