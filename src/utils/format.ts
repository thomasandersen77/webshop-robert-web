/** `amount` i hele kroner (visning). */
export function formatNok(amount: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** API `amountMinor` (øre) → formatert NOK. */
export function formatNokFromMinor(amountMinor: number): string {
  return formatNok(amountMinor / 100);
}
