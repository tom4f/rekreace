import { gql, useQuery } from '@apollo/client';

export type Order = {
  id: number;
  apartment: number;
  persons: number;
  check_in: string;
  check_out: string;
  email: string;
  phone: string;
  name: string;
  confirm_via: string;
  address: string;
  info?: string;
  created_at: string;
  order_status: 'new' | 'confirmed' | 'canceled' | 'completed';
  due_date_info?: string;
  order_info?: string;
  title_prefix?: string;
  __typename?: string;
};

export type GetOrdersResponse = {
  getOrders: Order[];
};

export const GET_ORDERS_QUERY = gql`
  query GetOrders {
    getOrders {
      id
      apartment
      persons
      check_in
      check_out
      email
      phone
      name
      confirm_via
      address
      info
      created_at
      order_status
      due_date_info
      order_info
      title_prefix
    }
  }
`;

export const useGetOrdersGraphQL = () => {
  const { data, ...rest } = useQuery<GetOrdersResponse>(GET_ORDERS_QUERY);

  return { data: data?.getOrders ?? [], ...rest };
};
