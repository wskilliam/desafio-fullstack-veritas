package main

import (
	"errors"
	"strings"
)

const (
	StatusTodo       = "todo"
	StatusInProgress = "in_progress"
	StatusDone       = "done"
)

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
}

func (t *Task) Validate() error {

	t.Title = strings.TrimSpace(t.Title)
	if t.Title == "" {
		return errors.New("o título da tarefa é obrigatório")
	}
	if t.Status == "" {
		t.Status = StatusTodo
	}
	switch t.Status {
	case StatusTodo, StatusInProgress, StatusDone:
		return nil
	default:
		return errors.New("status inválido: deve ser 'todo', 'in_progress' ou 'done'")
	}
}
