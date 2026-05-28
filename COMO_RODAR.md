# Como rodar o SAS/SPM Mobile

## 1. Configurar credenciais Firebase

Copie o arquivo `.env` e preencha com as credenciais do projeto web:

```
EXPO_PUBLIC_FIREBASE_API_KEY=<valor de VITE_FIREBASE_API_KEY>
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=<valor de VITE_FIREBASE_AUTH_DOMAIN>
EXPO_PUBLIC_FIREBASE_PROJECT_ID=<valor de VITE_FIREBASE_PROJECT_ID>
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<valor de VITE_FIREBASE_STORAGE_BUCKET>
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<valor de VITE_FIREBASE_MESSAGING_SENDER_ID>
EXPO_PUBLIC_FIREBASE_APP_ID=<valor de VITE_FIREBASE_APP_ID>
```

Os valores estão no `.env` do projeto web (raiz do repositório).

## 2. Instalar dependências

```bash
cd sas-spm-mobile
npm install
npx expo install expo-router expo-location expo-linking expo-status-bar expo-splash-screen
npx expo install react-native-maps
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context react-native-screens
```

## 3. Rodar no Expo Go (mais fácil)

```bash
npx expo start
```

Escaneie o QR Code com o app **Expo Go** no celular.

> **Atenção:** react-native-maps pode não funcionar no Expo Go em todas as versões.
> Se o mapa não carregar, teste com `npx expo run:android` (build nativo).

## 4. Build nativo (Android)

```bash
npx expo run:android
```

Requer Android Studio + emulador ou dispositivo físico com USB debug.

## Estrutura de arquivos

```
sas-spm-mobile/
├── app/                   # Rotas (Expo Router file-based)
│   ├── _layout.jsx        # Layout raiz (AuthProvider)
│   ├── index.jsx          # Splash screen
│   ├── (auth)/            # Telas sem autenticação
│   │   ├── login.jsx
│   │   └── cadastro.jsx
│   └── (app)/             # Telas protegidas (tabs)
│       ├── home.jsx       # Botão de emergência
│       ├── mapa.jsx       # Mapa de delegacias
│       ├── contatos.jsx   # CRUD de contatos
│       ├── juridico.jsx   # Base de leis
│       └── perfil.jsx     # Dados do usuário + logout
└── src/
    ├── components/        # Componentes React Native
    ├── hooks/             # Lógica de negócio (migrada do web)
    ├── services/          # Firebase, Haversine, WhatsApp
    ├── context/           # AuthContext
    └── styles/            # theme.js
```
