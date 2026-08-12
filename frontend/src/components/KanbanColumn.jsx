import React from 'react';
import { TaskCard } from './TaskCard';

export const KanbanColumn = ({ title, tasks, onUpdateStatus, onDelete }) => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: '#f4f5f7',
      borderRadius: '8px',
      padding: '16px',
      minWidth: '250px'
    }}>
      <h3 style={{ marginTop: 0, borderBottom: '2px solid #ddd', paddingBottom: '8px' }}>
        {title} ({tasks.length})
      </h3>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};