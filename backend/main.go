package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func enableCors(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	store := NewTaskStore()

	taskHandler := func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/tasks")

		switch r.Method {
		case http.MethodGet:
			if path == "" || path == "/" {
				store.GetTasksHandler(w, r)
			} else {
				http.Error(w, "Rota não permitida", http.StatusNotFound)
			}
		case http.MethodPost:
			if path == "" || path == "/" {
				store.CreateTaskHandler(w, r)
			} else {
				http.Error(w, "Rota não permitida", http.StatusNotFound)
			}
		case http.MethodPut:
			if path != "" && path != "/" {
				store.UpdateTaskHandler(w, r)
			} else {
				http.Error(w, "ID da tarefa é obrigatório para atualização", http.StatusBadRequest)
			}
		case http.MethodDelete:
			if path != "" && path != "/" {
				store.DeleteTaskHandler(w, r)
			} else {
				http.Error(w, "ID da tarefa é obrigatório para exclusão", http.StatusBadRequest)
			}
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	}

	http.HandleFunc("/tasks", enableCors(taskHandler))
	http.HandleFunc("/tasks/", enableCors(taskHandler))

	port := ":8080"
	fmt.Printf("Servidor iniciado na porta http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
