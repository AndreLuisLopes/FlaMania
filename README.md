# 📱 FlaMania

Aplicativo mobile feito com **React Native + Expo** que oferece uma experiência completa para torcedores do Flamengo: notícias atualizadas, torneios, partidas e autenticação de usuários.

---

### 🧱 Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router v2](https://docs.expo.dev/router/)
- [Firebase Auth](https://firebase.google.com/)
- [NewsAPI v2](https://newsapi.org/)
- [Axios](https://axios-http.com/)

---

### 📂 Estrutura de Pastas

```
├── app/
│   ├── index.js              # Rota inicial (redireciona para home)
│   ├── login.js              # Tela de login com Firebase
│   ├── register.js           # Tela de registro
│   ├── home.js               # Página principal com feed de notícias
│   ├── pagina_inicio.js      # Alternativa ou layout de testes
│   ├── splash.js             # Tela de abertura animada
│   ├── _layout.js            # Layout de navegação (tabs)
│   ├── componentes/
│   │   └── button.js         # Botão reutilizável
│   └── constants/
│       └── colors.js         # Paleta de cores
├── assets/
│   ├── flamania.png
│   ├── libertadores.png
│   ├── carioca.png
│   └── brasileiro.png
```

---

### 🔐 Funcionalidades

- [x] Login e Registro com Firebase
- [x] Feed de notícias via NewsAPI (busca por "Flamengo")
- [ ] Listagem de torneios com ícones
- [ ] Partidas em destaque e próximas (via API Futebol – pendente)
- [ ] Favoritos e perfil de usuário

---

### 🚀 Como Executar

1. Clone o projeto:

```bash
git clone https://github.com/seu-usuario/flamania.git
cd flamania
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto com Expo:

```bash
npx expo start
```

---

### 🗝️ Configuração Necessária

#### 🔧 Firebase

Crie um arquivo `firebaseConfig.js` com suas credenciais:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

#### 📰 NewsAPI

Crie uma conta gratuita em [newsapi.org](https://newsapi.org) e use sua chave na requisição `axios.get(...)`.

---

### 📌 To-do

- [ ] Integração com API de futebol
- [ ] Tela de detalhes da notícia
- [ ] Modo escuro
- [ ] Testes unitários

---

### 📄 Licença

MIT © 2025 — Desenvolvido por [André Luís]
