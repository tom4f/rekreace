import { gql, useMutation } from '@apollo/client';

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
};

export type UpdateResponse = {
  updateBooking: {
    result: string;
    message: string;
  };
};

type UpdateBookingErrorResponse = {
  message: string;
  graphQLErrors?: Array<{ message: string }>;
  networkError?: Error;
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
    { input: UpdateBookingRequest },
    UpdateBookingErrorResponse
  >(UPDATE_BOOKING_MUTATION, {
    refetchQueries: [
      {
        query: GET_ORDERS_QUERY,
      },
    ],
  });
};
