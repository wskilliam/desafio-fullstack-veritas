import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import { KanbanColumn } from './components/KanbanColumn';
import { TaskForm } from './components/TaskForm';

export function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data || []);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar as tarefas da API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const created = await createTask(newTask);
      setTasks((prev) => [...prev, created]);
    } catch (err) {
      alert('Erro ao criar tarefa.');
    }
  };

  const handleUpdateStatus = async (task, newStatus) => {
    try {
      const updatedPayload = { 
        id: task.id,
        title: task.title,
        description: task.description || "",
        status: newStatus, 
      };

      const updated = await updateTask(task.id, updatedPayload);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      alert('Erro ao atualizar status da tarefa.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert('Erro ao excluir tarefa.');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>📋 Mini Kanban de Tarefas</h2>

      <TaskForm onAddTask={handleAddTask} />

      {loading && <p>Carregando tarefas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <KanbanColumn
            title="A Fazer"
            tasks={tasks.filter((t) => t.status === 'todo')}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
          />
          <KanbanColumn
            title="Em Progresso"
            tasks={tasks.filter((t) => t.status === 'in_progress')}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
          />
          <KanbanColumn
            title="Concluídas"
            tasks={tasks.filter((t) => t.status === 'done')}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
          />
        </div>
      )}
    </div>
  );
}

export default App;