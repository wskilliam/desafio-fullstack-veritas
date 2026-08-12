import React, { useState } from 'react';

export const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({ title, description, status: 'todo' });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
      <input
        type="text"
        placeholder="Título da tarefa *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: '8px', flex: 1 }}
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '8px', flex: 2 }}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Adicionar</button>
    </form>
  );
};