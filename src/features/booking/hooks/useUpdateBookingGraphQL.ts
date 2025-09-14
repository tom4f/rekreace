import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

import { GET_ORDERS_QUERY } from './useGetOrdersGraphQL';

export type UpdateBookingRequest = {
  id: number;
  apartment?: number;
  persons?: number;
  check_in?: string;
  check_out?: string;
  email?: string;
  phone?: string;
  name?: string;
  confirm_via?: string;
  address?: string;
  info?: string;
  order_status?: string;
  due_date_info?: string;
  order_info?: string;
  title_prefix?: string;
};

export type UpdateResponse = {
  updateBooking: {
    result: string;
    message: string;
  };
};

const UPDATE_BOOKING_MUTATION = gql`
  mutation UpdateBooking($input: UpdateBookingInput!) {
    updateBooking(input: $input) {
      result
      message
    }
  }
`;

export const useUpdateBookingGraphQL = () => {
  return useMutation<
    UpdateResponse,
    { input: UpdateBookingRequest }
  >(UPDATE_BOOKING_MUTATION, {
    refetchQueries: [
      {
        query: GET_ORDERS_QUERY,
      },
    ],
  });
};
