// Configurações internas do sistema
// Este arquivo contém configurações sensíveis do sistema

/**
 * Configuração de autenticação e permissões
 * @private
 */
const AUTH_CONFIG = {
  // Email padrão para acesso administrativo
  DEFAULT_ADMIN: 'teste@teste.com',
  
  // Configurações de sessão
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas
  
  // Configurações de API
  API_TIMEOUT: 10000, // 10 segundos
}

/**
 * Verifica se um email tem privilégios administrativos
 * @param {string} email - Email do usuário
 * @returns {boolean} - True se for admin
 */
export const isAdminEmail = (email) => {
  if (!email) return false
  
  // Verifica primeiro a variável de ambiente
  const envAdmin = import.meta.env.VITE_ADMIN_EMAIL
  if (envAdmin && email === envAdmin) {
    return true
  }
  
  // Fallback para configuração interna
  return email === AUTH_CONFIG.DEFAULT_ADMIN
}

/**
 * Obtém o email de admin configurado
 * @returns {string} - Email do admin
 */
export const getAdminEmail = () => {
  return import.meta.env.VITE_ADMIN_EMAIL || AUTH_CONFIG.DEFAULT_ADMIN
}

/**
 * Configurações exportadas (apenas as não sensíveis)
 */
export const CONFIG = {
  SESSION_TIMEOUT: AUTH_CONFIG.SESSION_TIMEOUT,
  API_TIMEOUT: AUTH_CONFIG.API_TIMEOUT,
}

/**
 * Base URL da API
 * - Em produção (Vercel), use a env `VITE_API_URL` apontando para o backend no Render
 * - Em desenvolvimento, faz fallback para `http://localhost:3001`
 */
export const API_BASE_URL = (
  (import.meta.env && import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).trim()) ||
  (import.meta.env && import.meta.env.DEV ? 'http://localhost:3001' : '')
)
