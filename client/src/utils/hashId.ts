// Convert a Mongo _id string to a stable positive 32-bit number
export function hashIdToNumber(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0; // 32-bit
  }
  return Math.abs(hash);
}
