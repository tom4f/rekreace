import { useParams } from 'react-router-dom';
import { useGetOrdersGraphQL } from 'src/features/booking';

import { Form } from '../Form';
import { QRCode } from './QRCode';

export const Order = () => {
  const { id } = useParams();
  const { data: orders } = useGetOrdersGraphQL();

  if (!id) return null;

  const order = orders.find((order) => order.id === Number(id));

  return (
    <div>
      <Form updateData={order} />
      <QRCode />
    </div>
  );
};
