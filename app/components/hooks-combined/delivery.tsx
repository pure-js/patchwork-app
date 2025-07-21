import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { css } from '@linaria/core';

const DeliveryOptions = ({ productId, countryCode }: { productId: string; countryCode: string }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [deliverySlots, setDeliverySlots] = useState([]);

  const { data, loading } = useQuery(GET_DELIVERY_OPTIONS, {
    variables: { productId, countryCode },
  });

  useEffect(() => {
    if (data?.deliveryOptions) {
      const fastDelivery = data.deliveryOptions.find(
        (opt) => opt.type === 'FAST',
      );
      if (fastDelivery) {
        fetch(`/api/delivery-slots/${fastDelivery.id}`)
          .then((res) => res.json())
          .then((slots) => setDeliverySlots(slots))
          .catch((error) => console.error('Error fetching delivery slots:', error));
      }
    }
  }, [data]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={container}>
      <h3>Choose Delivery</h3>
      {loading && <div>Loading...</div>}
      {data?.deliveryOptions.map((option) => (
        <div
          key={option.id}
          className={optionCard}
          onClick={() => handleOptionSelect(option)}
          selected={selectedOption?.id === option.id}
        >
          <h4>{option.name}</h4>
          <p>{option.description}</p>
          <span className={price}>{option.price}</span>
        </div>
      ))}
      {deliverySlots.length > 0 && (
        <div>
          <h4>Available Slots</h4>
          {deliverySlots.map((slot) => (
            <div key={slot.id}>{slot.time}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const container = css`
  padding: 20px;
  border: 1px solid #ccc;
`;

const optionCard = css`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const price = css`
  font-weight: bold;
  color: green;
`;

export default DeliveryOptions;
