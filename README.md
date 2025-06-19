# OneBitFlix

Uma plataforma de streaming de cursos inspirada na Netflix, desenvolvida com Next.js, TypeScript e Node.js.

## 🚀 Tecnologias

- Frontend:

  - Next.js
  - TypeScript
  - React
  - Reactstrap
  - SWR
  - SCSS

- Backend:
  - Node.js
  - Express
  - TypeScript
  - PostgreSQL
  - JWT

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- postgreSQL
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Mauriciodalligna/onebitflix.git
cd onebitflix
```

2. Instale as dependências do backend:

```bash
cd backend
npm install
```

3. Instale as dependências do frontend:

```bash
cd ../frontend
npm install
```

4. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env` tanto no backend quanto no frontend
   - Preencha as variáveis com suas configurações

5. Configure o banco de dados:
   - Crie um banco de dados MySQL
   - Execute os scripts de migração (se houver)

## 🚀 Executando o projeto

1. Inicie o backend:

```bash
cd backend
npm run dev
```

2. Em outro terminal, inicie o frontend:

```bash
cd frontend
npm run dev
```

3. Acesse a aplicação em `http://localhost:3001`

## 📝 Funcionalidades

- Autenticação de usuários
- Listagem de cursos
- Reprodução de vídeos
- Controle de progresso dos episódios
- Categorização de cursos
- Sistema de favoritos

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- [OneBitCode](https://onebitcode.com/) pelo curso e inspiração
- Todos os contribuidores que ajudaram no projeto
