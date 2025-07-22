import { useEffect, useState } from 'react';

export const useTodos = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://jsonplaceholder.typicode.com/todos', { signal })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
    return () => {
      controller.abort(); // Clean up the fetch request on component unmount
    };
  }, []);

  return { loading };
};
