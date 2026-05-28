// Paleta roxa baseada no projeto web (header-gradient: #9576F7 → #8160E5)
export const theme = {
  colors: {
    primary: '#9576F7',        // roxo principal (web: header-gradient start)
    primaryDark: '#8160E5',    // roxo escuro (web: header-gradient end)
    primaryLight: '#BBA4F8',
    card: '#F3E8FF',           // purple-100 — fundo dos cards de auth/lei
    inputBg: '#E5E7EB',        // gray-200 — fundo dos campos de input
    background: '#FFFFFF',
    surface: '#F9FAFB',        // gray-50
    surfaceAlt: '#EDEDED',     // fundo dos cards de lei (web exato)
    text: '#1F2937',           // gray-800
    textSecondary: '#6B7280',  // gray-500
    textPurple: '#6D28D9',     // purple-700 — texto de destaque roxo
    border: '#E5E7EB',
    danger: '#EF4444',         // red-500
    dangerDark: '#DC2626',     // red-600
    success: '#22C55E',        // green-500
    warning: '#FBBF24',        // yellow-400 — botão editar
    white: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSize: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    xxl: 28,
    full: 999,
  },
};
