/**
 * Backend `Product` har ingen bilde-URL. Vi bruker deterministiske placeholders kun for UI.
 * MÅ VERIFISERES: erstatt med ekte `imageUrl` fra API når backend utvides.
 */
const PICSUM_SEED_BASE = 1000;

function hashToInt(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h << 5) - h + id.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function placeholderProductImage(productId: string): string {
  const seed = PICSUM_SEED_BASE + (hashToInt(productId) % 900);
  return `https://picsum.photos/seed/${seed}/640/480`;
}

export function placeholderCategoryImage(categoryId: string): string {
  const seed = PICSUM_SEED_BASE + 5000 + (hashToInt(categoryId) % 900);
  return `https://picsum.photos/seed/${seed}/800/600`;
}
