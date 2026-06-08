export function nextId(existing = []) {
  const max = existing.reduce((m, x) => (typeof x?.id === "number" ? Math.max(m, x.id) : m), 0);
  return max + 1;
}

