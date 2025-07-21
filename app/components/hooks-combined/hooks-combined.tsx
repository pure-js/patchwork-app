import { useActionState, useCallback, useContext } from 'react';

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useActionState(increment, 0);

  
  const theme = useContext(ThemeContext);

  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  )
}

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
}
