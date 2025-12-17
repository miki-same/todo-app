import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { saveTodos, loadTodos } from './utils/todoStorage';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updates) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>TODO App</h1>
          <div className="stats">
            <span>未完了: {activeCount}</span>
            <span>完了: {completedCount}</span>
          </div>
        </header>

        <TodoForm onAdd={addTodo} />

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            すべて
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            未完了
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            完了
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
