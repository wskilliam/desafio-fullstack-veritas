# 📋 Mini Kanban de Tarefas (React + Go)

Aplicação Fullstack simples de gerenciamento de tarefas em formato Kanban, desenvolvida como desafio técnico.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, Vite, JavaScript (ES6+), Fetch API.
- **Backend**: Go (Golang) com o pacote nativo `net/http` e `sync.RWMutex` para estado em memória.
- **Documentação**: Diagrama de User Flow em `/docs`.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Go](https://golang.org/) instalado (v1.18+).
- [Node.js](https://nodejs.org/) e npm instalados.

### 1. Executando o Backend
```bash
cd backend
go run .