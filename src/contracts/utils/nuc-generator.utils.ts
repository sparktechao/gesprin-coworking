// src/utils/nuc-generator.util.ts
export function generateNuc(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let nuc = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    nuc += chars[randomIndex];
  }
  return nuc;
}
