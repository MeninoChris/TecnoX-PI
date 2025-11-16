// Utilitário de carrinho usando localStorage, AGORA escopado por usuário
// Estrutura de item: { id, title, price, image, type: 'product'|'accessory', quantity }

const CART_KEY = 'cartItems';
const CHECKOUT_KEY = 'checkoutItem'; // legado (um item)
const CHECKOUT_ITEMS_KEY = 'checkoutItems'; // novo (múltiplos itens)

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function getUserScopeId() {
  try {
    const raw = localStorage.getItem('usuarioLogado');
    const user = raw ? JSON.parse(raw) : null;
    let id = 'guest';
    if (user && (user.id || user.email)) {
      id = String(user.id || user.email).toLowerCase();
    }
    // Sanitiza para usar como parte da chave do localStorage
    return id.replace(/[^a-z0-9_.-]/g, '-');
  } catch {
    return 'guest';
  }
}

function scopedKey(base) {
  const scope = getUserScopeId();
  return `${base}__${scope}`;
}

// Migração suave: se não houver dados escopados, tenta ler a chave antiga
function readScoped(base, fallbackValue) {
  const key = scopedKey(base);
  const raw = localStorage.getItem(key);
  if (raw != null) return safeParse(raw, fallbackValue);

  // Fallback: chave antiga sem escopo
  const legacyRaw = localStorage.getItem(base);
  const parsed = safeParse(legacyRaw, fallbackValue);
  // Se existir dado legado, move para a chave escopada e limpa o legado
  if (legacyRaw != null) {
    try {
      localStorage.setItem(key, legacyRaw);
      // Opcional: apenas remove legado quando NÃO for convidado
      const scope = getUserScopeId();
      if (scope !== 'guest') localStorage.removeItem(base);
    } catch {}
  }
  return parsed;
}

function writeScoped(base, value) {
  const key = scopedKey(base);
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCart() {
  const list = readScoped(CART_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveCart(items) {
  writeScoped(CART_KEY, items || []);
}

export function addItem(item, qty = 1) {
  if (!item || !item.id) return;
  const items = getCart();
  const idx = items.findIndex((i) => i.id === item.id && i.type === item.type);
  if (idx >= 0) {
    items[idx].quantity = Math.max(1, (items[idx].quantity || 1) + qty);
  } else {
    items.push({ ...item, quantity: Math.max(1, qty || 1) });
  }
  saveCart(items);
  return items;
}

export function updateQty(id, type, qty) {
  const q = parseInt(qty, 10);
  const items = getCart();
  const idx = items.findIndex((i) => i.id === id && i.type === type);
  if (idx >= 0) {
    if (!q || q <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].quantity = q;
    }
    saveCart(items);
  }
  return items;
}

export function removeItem(id, type) {
  const items = getCart().filter((i) => !(i.id === id && i.type === type));
  saveCart(items);
  return items;
}

export function clearCart() {
  saveCart([]);
}

export function getTotals() {
  const items = getCart();
  const subtotal = items.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0);
  return { subtotal, total: subtotal };
}

export function setCheckoutItem(payload) {
  if (!payload) return;
  writeScoped(CHECKOUT_KEY, payload);
}

export function getCheckoutItem() {
  return readScoped(CHECKOUT_KEY, null);
}

export function clearCheckoutItem() {
  const key = scopedKey(CHECKOUT_KEY);
  localStorage.removeItem(key);
}

// Novo fluxo: checkout com múltiplos itens
export function setCheckoutItems(items) {
  if (!items || !Array.isArray(items)) return;
  writeScoped(CHECKOUT_ITEMS_KEY, items);
}

export function getCheckoutItems() {
  const arr = readScoped(CHECKOUT_ITEMS_KEY, []);
  return Array.isArray(arr) ? arr : [];
}

export function clearCheckoutItems() {
  const key = scopedKey(CHECKOUT_ITEMS_KEY);
  localStorage.removeItem(key);
}

export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}
