# SPM Mobile

Aplicativo móvel do **Sistema de Alerta e Suporte à Mulher**, desenvolvido com Expo (React Native). Permite que mulheres em situação de violência disparem alertas de emergência com localização via WhatsApp, consultem delegacias próximas e acessem informações jurídicas de proteção.

## Funcionalidades

- **Alerta de emergência** — envia localização GPS para contatos cadastrados via WhatsApp com um toque
- **Mapa de delegacias** — exibe delegacias da mulher próximas usando `react-native-maps`
- **Contatos de emergência** — CRUD sincronizado com Firestore
- **Base jurídica** — leis de proteção à mulher (Lei Maria da Penha, Lei do Feminicídio, etc.)
- **Autenticação** — login e cadastro via Firebase Auth REST API (compatível com Expo Go)
- **Persistência de sessão** — token armazenado com AsyncStorage

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Expo 54 + React Native 0.81 |
| Navegação | Expo Router (file-based) |
| Backend | Firebase Firestore |
| Auth | Firebase Identity Toolkit REST API |
| Mapas | react-native-maps |
| Localização | expo-location |

## Pré-requisitos

- Node.js 18+
- App **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Projeto Firebase com Firestore habilitado

## Configuração

1. Clone o repositório e entre na pasta:
```bash
git clone <url-do-repositorio>
cd sas-spm-mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` a partir do exemplo:
```bash
cp .env.example .env
```

4. Preencha `.env` com as credenciais do seu projeto Firebase:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

## Como rodar

```bash
npx expo start
```

Escaneie o QR Code com o **Expo Go** no celular.

## Estrutura do projeto

```
sas-spm-mobile/
├── app/                        # Rotas (Expo Router file-based)
│   ├── _layout.jsx             # Layout raiz — AuthProvider
│   ├── index.jsx               # Splash screen com redirecionamento
│   ├── (auth)/
│   │   ├── login.jsx
│   │   └── cadastro.jsx
│   └── (app)/                  # Telas protegidas (abas)
│       ├── home.jsx            # Botão de emergência
│       ├── mapa.jsx            # Mapa de delegacias
│       ├── contatos.jsx        # Gerenciar contatos
│       ├── juridico.jsx        # Base de leis
│       └── perfil.jsx          # Perfil + logout
└── src/
    ├── assets/                 # Imagens e ícones
    ├── components/             # Componentes reutilizáveis
    ├── context/                # AuthContext
    ├── hooks/                  # Lógica de negócio
    ├── services/
    │   ├── auth.js             # Firebase Auth via REST API
    │   ├── firebase.js         # App e Firestore SDK
    │   ├── whatsapp.js         # Envio de alertas
    │   └── haversine.js        # Cálculo de distância
    └── styles/
        └── theme.js            # Cores, espaçamentos, tipografia
```

## Regras do Firestore

O app espera a seguinte estrutura de dados:

```
usuarios/{uid}/
  usuario: string
  email: string
  telefone: string
  criadoEm: timestamp

usuarios/{uid}/contatosEmergencia/{id}/
  nome: string
  telefone: string
  criadoEm: timestamp
```

Regras mínimas recomendadas:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
