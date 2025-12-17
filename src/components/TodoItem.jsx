import { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    if (title.trim()) {
      onUpdate(todo.id, { title, priority, dueDate });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setPriority(todo.priority);
    setDueDate(todo.dueDate);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44aa44';
      default: return '#999';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '';
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="edit-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <div className="edit-buttons">
          <button onClick={handleSave} className="btn-save">保存</button>
          <button onClick={handleCancel} className="btn-cancel">キャンセル</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="checkbox"
      />
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        <div className="todo-meta">
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
          >
            {getPriorityLabel(todo.priority)}
          </span>
          {todo.dueDate && (
            <span className="due-date">期限: {todo.dueDate}</span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">編集</button>
        <button onClick={() => onDelete(todo.id)} className="btn-delete">削除</button>
      </div>
    </div>
  );
};

export default TodoItem;
