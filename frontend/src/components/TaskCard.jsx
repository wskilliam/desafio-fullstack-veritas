import React, { useState } from 'react';

export const TaskCard = ({ task, onUpdateTask, onUpdateStatus, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [startDate, setStartDate] = useState(task.startDate || '');
  const [endDate, setEndDate] = useState(task.endDate || '');

  const handleSave = () => {
    if (!title.trim()) {
      alert('O título é obrigatório.');
      return;
    }

    onUpdateTask({
      ...task,
      title,
      description,
      startDate,
      endDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setStartDate(task.startDate || '');
    setEndDate(task.endDate || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{
        border: '2px solid #2563eb',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '10px',
        backgroundColor: '#f8fafc'
      }}>
        <h5 style={{ margin: '0 0 8px 0' }}>Editar Tarefa</h5>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          style={{ width: '100%', marginBottom: '8px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          rows={2}
          style={{ width: '100%', marginBottom: '8px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical', boxSizing: 'border-box' }}
        />

        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', display: 'block', color: '#666' }}>Início:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', display: 'block', color: '#666' }}>Fim:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <button onClick={handleCancel} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#e2e8f0' }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ padding: '4px 10px', borderRadius: '4px', backgroundColor: '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Salvar
          </button>
        </div>
      </div>
    );
  }

  const buttonStyle = {
    flex: 1,
    padding: '6px 2px',
    fontSize: '11px',
    fontWeight: '500',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden' // Garante que nenhum conteúdo passe da borda do card
    }}>

      <h4 style={{ 
        margin: '0 0 6px 0', 
        fontSize: '15px', 
        color: '#1e293b',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere'
      }}>
        {task.title}
      </h4>
      
      {task.description && (
        <p style={{ 
          fontSize: '13px', 
          color: '#64748b', 
          margin: '0 0 10px 0', 
          lineHeight: '1.4',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere'
        }}>
          {task.description}
        </p>
      )}

      {/* Bloco de Datas */}
      {(task.startDate || task.endDate) && (
        <div style={{ 
          fontSize: '11px', 
          color: '#475569', 
          backgroundColor: '#f1f5f9', 
          padding: '6px 8px', 
          borderRadius: '6px', 
          marginBottom: '10px',
          boxSizing: 'border-box',
          display: 'flex',
          gap: '6px',
          justifyContent: 'space-between'
        }}>
          {task.startDate && <span>Início: <strong>{task.startDate}</strong></span>}
          {task.endDate && <span>Fim: <strong>{task.endDate}</strong></span>}
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        alignItems: 'center', 
        width: '100%',
        flexWrap: 'nowrap'
      }}>
        {task.status !== 'todo' && (
          <button 
            onClick={() => onUpdateStatus(task, 'todo')}
            style={{ ...buttonStyle, backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}
          >
            A Fazer
          </button>
        )}
        
        {task.status !== 'in_progress' && (
          <button 
            onClick={() => onUpdateStatus(task, 'in_progress')}
            style={{ ...buttonStyle, backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}
          >
            Progresso
          </button>
        )}
        
        {task.status !== 'done' && (
          <button 
            onClick={() => onUpdateStatus(task, 'done')}
            style={{ ...buttonStyle, backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}
          >
            Concluir
          </button>
        )}

        <button 
          onClick={() => setIsEditing(true)} 
          style={{ ...buttonStyle, backgroundColor: '#e2e8f0', color: '#1e293b' }}
        >
          Editar
        </button>

        <button 
          onClick={() => onDelete(task.id)} 
          style={{ ...buttonStyle, backgroundColor: '#ef4444', color: '#fff' }}
        >
          Excluir
        </button>
      </div>          
    </div>
  );
};