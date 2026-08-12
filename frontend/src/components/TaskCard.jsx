import React from 'react';

export const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '10px',
      backgroundColor: '#fff'
    }}>
      <h4 style={{ margin: '0 0 8px 0' }}>{task.title}</h4>
      {task.description && (
        <p style={{ fontSize: '14px', color: '#555', margin: '0 0 12px 0' }}>
          {task.description}
        </p>
      )}
      
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {}
        {task.status !== 'todo' && (
          <button onClick={() => onUpdateStatus(task, 'todo')}>
            ← A Fazer
          </button>
        )}
        
        {task.status !== 'in_progress' && (
          <button onClick={() => onUpdateStatus(task, 'in_progress')}>
            {task.status === 'todo' ? 'Progresso' : 'Progresso'}
          </button>
        )}
        
        {task.status !== 'done' && (
          <button onClick={() => onUpdateStatus(task, 'done')}>
            Concluir →
          </button>
        )}
        
        <button 
          onClick={() => onDelete(task.id)} 
          style={{ backgroundColor: '#ff4d4f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Excluir
        </button>
      </div>          
    </div>
  );
};