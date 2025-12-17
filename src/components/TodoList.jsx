import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  if (todos.length === 0) {
    return <div className="empty-message">タスクがありません</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
