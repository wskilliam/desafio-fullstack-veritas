# Mini Kanban de Tarefas (React + Go)

Aplicação Fullstack simples de gerenciamento de tarefas em formato Kanban, desenvolvida como desafio técnico.

## Tecnologias Utilizadas

- **Frontend**: React, Vite, JavaScript (ES6+), Fetch API.
- **Backend**: Go (Golang) com o pacote nativo `net/http` e `sync.RWMutex` para estado em memória.
- **Documentação**: Diagrama de User Flow em `/docs`.

---

## Documentação de Arquitetura

Os diagramas de arquitetura e fluxo da aplicação estão salvos na pasta `/docs`:

* **User Flow (`docs/user-flow.png`):** Fluxo de navegação e decisões do usuário na interface.
* **Data Flow (`docs/data-flow.png`):** Mapeamento do ciclo de vida dos dados (React ➔ JSON/HTTP ➔ Go Handler ➔ Struct/Mutex Store).

## Como Executar o Projeto

### Pré-requisitos
- [Go](https://golang.org/) instalado (v1.26.5).
- [Node.js](https://nodejs.org/) e npm instalados.

### 1. Executando o Backend
```bash
# Entrar na pasta do backend
cd backend

# Iniciar o servidor HTTP
go run .
```

### 2. Executando o Frontend
```bash
# Entrar na pasta do frontend
cd frontend

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```
### 3. Estrutura do Repositório
```
text
desafio-fullstack-veritas/
├── backend/
│   ├── main.go
│   ├── handlers.go
│   └── models.go
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── docs/
│   ├── user-flow.png
│   └── data-flow.png
└── README.md
```
### 4 - Decisões Técnicas

- **Implementação dos cabeçalhos HTTP de CORS (Access-Control-Allow-Origin, Methods, Headers) no Go para permitir a comunicação com o React em ambiente de desenvolvimento.**

- **Backend em Go Nativo (net/http):

- **Optei por não utilizar frameworks externos (como Gin ou Fiber) para demonstrar domínio dos pacotes nativos da linguagem e manter a aplicação leve e simples.**