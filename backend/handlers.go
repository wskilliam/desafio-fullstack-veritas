package main

import (
	"encoding/json"
	"net/http"
	"strings"
	"sync"

	"github.com/google/uuid"
)

type TaskStore struct {
	sync.RWMutex
	tasks map[string]Task
}

func NewTaskStore() *TaskStore {
	return &TaskStore{
		tasks: make(map[string]Task),
	}
}

func (ts *TaskStore) GetTasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ts.RLock()
	defer ts.RUnlock()

	tasks := make([]Task, 0, len(ts.tasks))
	for _, task := range ts.tasks {
		tasks = append(tasks, task)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(tasks)
}

func (ts *TaskStore) CreateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, "Erro ao decodificar o corpo da requisição", http.StatusBadRequest)
		return
	}

	if err := task.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	task.ID = uuid.New().String()

	ts.Lock()
	ts.tasks[task.ID] = task
	ts.Unlock()

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}

func (ts *TaskStore) UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := strings.TrimPrefix(r.URL.Path, "/tasks")
	id = strings.TrimPrefix(id, "/")

	if id == "" {
		http.Error(w, "ID não informado", http.StatusBadRequest)
		return
	}

	var updatedTask Task
	if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	ts.Lock()
	defer ts.Unlock()

	existingTask, exists := ts.tasks[id]
	if !exists {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	updatedTask.ID = existingTask.ID

	if err := updatedTask.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ts.tasks[id] = updatedTask

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(updatedTask)
}

func (ts *TaskStore) DeleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tasks")
	id = strings.TrimPrefix(id, "/")

	if id == "" {
		http.Error(w, "ID não informado", http.StatusBadRequest)
		return
	}

	ts.Lock()
	defer ts.Unlock()

	if _, exists := ts.tasks[id]; !exists {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	delete(ts.tasks, id)

	w.WriteHeader(http.StatusNoContent)
}
