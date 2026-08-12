import React, { useState } from 'react';

export const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('O título é obrigatório!');

    onAddTask({
      title,
      description,
      status: 'todo',
      startDate,
      endDate,
    });

    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Nova Tarefa</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="text"
          placeholder="Título da tarefa *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#64748b' }}>Data Início:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: '95%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#64748b' }}>Data Fim:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '95%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '8px', fontWeight: 'bold' }}>
          + Adicionar Tarefa
        </button>
      </div>
    </form>
  );
};