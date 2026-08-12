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
cd backend
go run .
```

### 2. Executando o Frontend
```bash
cd frontend
npm install
npm run dev
```