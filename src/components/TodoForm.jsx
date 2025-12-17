import { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        priority,
        dueDate,
      });
      setTitle('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="task-input"
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
      <button type="submit" className="btn-add">追加</button>
    </form>
  );
};

export default TodoForm;
