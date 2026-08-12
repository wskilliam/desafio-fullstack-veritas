import React from 'react';
import { TaskCard } from './TaskCard';

export const KanbanColumn = ({ title, tasks, onUpdateTask, onUpdateStatus, onDelete }) => {
  return (
    <div style={{ flex: 1, backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', minWidth: '280px' }}>
      <h3>{title} ({tasks.length})</h3>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};