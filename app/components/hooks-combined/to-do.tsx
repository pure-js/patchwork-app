import { useState } from 'react';
import { useTodos } from './use-todos';

import { generateUniqueId } from '~/utils/unique-id';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [usedIds] = useState<Set<number>>(new Set());

  const { loading } = useTodos();

  const addTodo = () => {
    if (!newTodo.trim()) return; // Don't add empty todos

    const todo = {
      id: generateUniqueId(usedIds),
      title: newTodo,
      completed: false,
    };

    // Create a new array instead of mutating the existing one
    setTodos([...todos, todo]);
    setNewTodo(''); // Clear input after adding
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todos</h1>
      {loading && <p>Loading...</p>}
      <input
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={todo.completed ? 'regular _decorated' : 'regular'}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
