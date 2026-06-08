const KEYS = {
  user: "ims:user",
  items: "ims:items",
  suppliers: "ims:suppliers",
};

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function loadUser() {
  const raw = localStorage.getItem(KEYS.user);
  return raw ? safeParse(raw, null) : null;
}

export function saveUser(user) {
  if (!user) return localStorage.removeItem(KEYS.user);
  localStorage.setItem(KEYS.user, JSON.stringify(user));
}

export function loadItems() {
  const raw = localStorage.getItem(KEYS.items);
  return raw ? safeParse(raw, []) : [];
}

export function saveItems(items) {
  localStorage.setItem(KEYS.items, JSON.stringify(items));
}

export function loadSuppliers() {
  const raw = localStorage.getItem(KEYS.suppliers);
  return raw ? safeParse(raw, []) : [];
}

export function saveSuppliers(suppliers) {
  localStorage.setItem(KEYS.suppliers, JSON.stringify(suppliers));
}

