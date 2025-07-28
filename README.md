# Guia do Calouro - Plataforma de Apoio Universitário

<img width="1816" height="877" alt="image" src="https://github.com/user-attachments/assets/c7ea6652-f6a9-4767-a3c8-f2f3e652c778" />
 <!-- Adicione sua imagem aqui -->

## Descrição do Projeto
Este projeto tem como objetivo ser um guia completo e uma plataforma de apoio para calouros, oferecendo informações essenciais e recursos práticos para uma transição tranquila e bem-sucedida para a vida universitária.

## Pré-requisitos
- Node.js (v18 ou superior)
- npm (v9 ou superior)
- PostgreSQL (v15 ou superior)
- Git

## Configuração do Projeto

### 1. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do diretório `server` com as credenciais do seu banco de dados:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=guia_ufc
```

### 2. Instalar dependências
```bash
# Instalar dependências do backend
cd server
npm install

# Instalar dependências do frontend
cd ../client
npm install
```

## Executando o Projeto

### Passo 1: Iniciar o banco de dados
```bash
cd server
npm run db  # Este comando cria e popula o banco de dados
```

### Passo 2: Iniciar o servidor backend
```bash
# Mantenha-se no diretório server
npm run dev
```

### Passo 3: Iniciar o aplicativo frontend
```bash
# Abra um novo terminal
cd client
npm start
```

## Tecnologias Utilizadas
### Backend
- Node.js
- Express
- PostgreSQL

### Frontend
- HTML
- CSS
- JavaScript
- Axios

### Ferramentas
- Git
- Postman
- pgAdmin

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
