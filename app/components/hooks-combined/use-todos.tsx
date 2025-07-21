import { useEffect, useState } from 'react';

export const useTodos = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
    return () => {
      // id.cancel;
    };
  }, []);

  return { loading };
};
