import { useParams } from 'react-router-dom';
import { useGetOrdersGraphQL } from 'src/features/booking';

export const useOrder = () => {
  const { id } = useParams();
  const { data: orders } = useGetOrdersGraphQL();

  if (!id || !orders) return null;

  return orders.find((order) => order.id === Number(id)) ?? null;
};
