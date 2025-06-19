# 🎬 OneBitFlix - Plataforma de Streaming Educacional

Este projeto é um **clone educacional** de uma plataforma de vídeos estilo Netflix, desenvolvido **do zero** como parte dos meus estudos em desenvolvimento full stack.

📚 O projeto foi construído com base em um curso da **OneBitCode**, onde eu **não clonei nenhum repositório**: reescrevi cada parte manualmente para reforçar o aprendizado.
Pagina Home

![home](https://github.com/user-attachments/assets/4fa4f679-c2c2-4446-8508-461fb111fe5a)

Pagina Profile

![profile](https://github.com/user-attachments/assets/d5cf8526-aa72-41f3-b182-aecbd9039c80)

Pagina Curso

![paginaCurso](https://github.com/user-attachments/assets/71c4a111-007a-426b-b8d4-046ae9974da4)

pagina Episódio

![paginaEpisodio](https://github.com/user-attachments/assets/d3f63a64-a802-45b6-9238-d0359fafe439)

Pagina Login

![Login](https://github.com/user-attachments/assets/abf5ec68-6f4f-42cb-968c-4ce2c0c134c2)

Pagina Registro de Usuario

![registroUsuario](https://github.com/user-attachments/assets/9c393a9e-4b42-44a5-851e-2f1c3c806baf)

Pagina Inicial

![PaginaInicial](https://github.com/user-attachments/assets/d0d8ccea-8d8e-45a2-a70f-8d222757506c)

Painel Administrativo

![painelAdmin](https://github.com/user-attachments/assets/4c37b1b5-726f-43c4-95cc-58e54354ac5c)


---

## 🔧 Tecnologias utilizadas

### 🚀 Frontend

- **Next.js 13.4.1** - Framework React com SSR
- **React 18.2.0** - Biblioteca para interfaces
- **TypeScript 4.7.4** - Tipagem estática
- **Sass/SCSS** - Pré-processador CSS
- **Bootstrap 5.2.3** - Framework CSS
- **SWR 2.1.5** - Hooks para data fetching
- **React Player 2.12.0** - Player de vídeo
- **Axios 1.4.0** - Cliente HTTP

### ⚙️ Backend

- **Node.js** - Runtime JavaScript
- **Express.js 4.17.2** - Framework web
- **TypeScript 4.5.4** - Tipagem estática
- **Sequelize 6.13.0** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT 8.5.1** - Autenticação por tokens
- **Bcrypt 5.0.1** - Criptografia de senhas
- **AdminJS 5.5.1** - Painel administrativo

---

## 💡 Funcionalidades

### 🔐 Sistema de Autenticação

- Registro e login de usuários
- Autenticação JWT
- Proteção de rotas privadas
- Gerenciamento de sessões

### 📺 Plataforma de Cursos

- Listagem de cursos por categoria
- Sistema de episódios com player de vídeo
- Controle de tempo de visualização
- Busca de cursos por nome

### ❤️ Interações do Usuário

- Sistema de favoritos
- Sistema de likes/curtidas
- Perfil do usuário com dados editáveis
- Alteração de senha

### 🎯 Categorização

- Cursos organizados por categorias
- Cursos em destaque (featured)
- Cursos mais recentes
- Navegação por slides

### 👨‍💼 Painel Administrativo

- Dashboard com estatísticas
- Gerenciamento de cursos
- Upload de vídeos e thumbnails
- Interface administrativa integrada

---

## 🧠 O que eu aprendi

### Arquitetura e Design Patterns

- Arquitetura MVC no backend
- Separação de responsabilidades (Services, Controllers, Models)
- Middleware de autenticação
- Tratamento de erros centralizado

### 🔄 Integração Frontend ↔ Backend

- APIs RESTful
- Comunicação via Axios
- Gerenciamento de estado com SWR
- Tratamento de loading e erros

### 🎨 Desenvolvimento Frontend

- Componentização com React
- Styling com SCSS modules
- Responsividade com Bootstrap
- Animações com AOS (Animate On Scroll)

### 🗄️ Banco de Dados

- Modelagem de dados com Sequelize
- Relacionamentos entre tabelas
- Migrações e seeders
- Queries otimizadas

### 🔒 Segurança

- Criptografia de senhas com bcrypt
- Autenticação JWT
- Validação de dados
- Proteção contra ataques comuns

---

## 📊 Estrutura do Projeto

````
onebitflix/
├── backend/                 # API REST
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── models/         # Modelos do Sequelize
│   │   ├── services/       # Lógica de negócio
│   │   ├── middlewares/    # Middlewares (auth, etc.)
│   │   ├── database/       # Migrações e seeders
│   │   └── admin.js/       # Painel administrativo
│   └── uploads/            # Arquivos de mídia
├── frontend/               # Aplicação Next.js
│   ├── pages/             # Páginas da aplicação
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Serviços de API
│   │   └── styles/        # Estilos SCSS
│   └── public/            # Arquivos estáticos

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/mauriciodalligna/onebitflix.git
cd onebitflix
````

### 2. Configure o Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Configure o banco de dados
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Inicie o servidor
npm run dev
```

### 3. Configure o Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# Inicie o servidor de desenvolvimento
npm run dev
```

### 4. Acesse a aplicação

- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 🔧 Variáveis de Ambiente

### Backend (.env)

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=onebitflix_development
DB_PORT=5432
JWT_SECRET=seu_jwt_secret
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_BASEURL=http://localhost:3000
```

---

## 📱 Funcionalidades Demonstradas

### 🎯 Autenticação Completa

- Registro com validação de dados
- Login com JWT
- Proteção de rotas
- Logout seguro

### 🎬 Player de Vídeo

- Controle de reprodução
- Salvamento de tempo de visualização
- Navegação entre episódios
- Interface responsiva

### 🔍 Sistema de Busca

- Busca em tempo real
- Filtros por categoria
- Resultados paginados
- Histórico de busca

### ❤️ Interações Sociais

- Adicionar/remover favoritos
- Sistema de likes
- Perfil personalizado
- Estatísticas de uso

---

## 🎨 Interface do Usuário

O projeto apresenta uma interface moderna e responsiva, inspirada na Netflix, com:

- **Design responsivo** para desktop, tablet e mobile
- **Animações suaves** com AOS (Animate On Scroll)
- **Slides interativos** para navegação
- **Player de vídeo** customizado
- **Modais** para interações
- **Toasts** para feedback do usuário

---

## 📈 Melhorias Implementadas

### 🔧 Otimizações Técnicas

- **Lazy loading** de componentes
- **Code splitting** automático do Next.js
- **Cache inteligente** com SWR
- **Tratamento de erros** robusto
- **Loading states** para melhor UX

### 🎯 Funcionalidades Extras

- **Sistema de busca** avançado
- **Controle de tempo** de visualização
- **Painel administrativo** completo
- **Upload de arquivos** integrado
- **Validações** de formulário

---

## 🐛 Problemas Resolvidos

Durante o desenvolvimento, enfrentei e resolvi diversos desafios:

- **SSR Issues**: Problemas de hidratação no Next.js
- **Autenticação**: Implementação segura de JWT
- **Upload de Arquivos**: Configuração do AdminJS
- **Relacionamentos**: Complexidade do Sequelize
- **Estado Global**: Gerenciamento de autenticação
- **Performance**: Otimização de queries e cache

---

## 🤝 Contribuição

Este é um projeto educacional, mas sugestões e melhorias são sempre bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Maurício** - Desenvolvedor Full Stack

- LinkedIn: https://www.linkedin.com/in/mauricio-durante-dall-igna/
- GitHub: https://github.com/Mauriciodalligna
- Email: mauriciodalligna@gmail.com

---

## 🙏 Agradecimentos

- **OneBitCode** pela excelente base educacional
- Comunidade React/Next.js pelo suporte
- Stack Overflow pelos inúmeros insights

---

## ⚠️ Nota Importante

Este projeto foi desenvolvido **exclusivamente para fins educacionais**. É um clone da Netflix focado em cursos de programação, demonstrando habilidades em desenvolvimento full stack.

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**
