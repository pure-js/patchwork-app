import { useState } from 'react';
import { useTodos } from './use-todos';

interface ToodoItem {
  id: number;
  title: string;
  compledted: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<ToodoItem[]>([]);

  const { loading, newTodo } = useTodos();
  const uniqueNumbers = new Set();

  const addTodo = () => {
    const todo = {
      id: Math.random(),
      title: newTodo,
      completed: false,
    };
    todos.push(todo); // rewtire using external variable
    setTodos(todos);
    setNewTodo(''); // ?
  };

  const toggleTodo = (id) => {
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
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={todo.completed ? 'regular _decorated' : 'regular '}
            // style={{
            //   '__decorated',
            //   textDecoration: todo.completed ? 'line-through' : 'none',
            // }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
