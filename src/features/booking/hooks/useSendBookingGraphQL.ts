import { gql, useMutation } from '@apollo/client';

export type SendBookingRequest = {
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
  antispam_code: number;
  antispam_code_orig: number;
};

export type SendResponse = {
  sendBooking: {
    result: string;
    message: string;
  };
};

type SendBookingErrorResponse = {
  message: string;
  graphQLErrors?: Array<{ message: string }>;
  networkError?: Error;
};

const SEND_BOOKING_MUTATION = gql`
  mutation SendBooking($input: SendBookingInput!) {
    sendBooking(input: $input) {
      result
      message
    }
  }
`;

export const useSendBookingGraphQL = () => {
  return useMutation<
    SendResponse,
    { input: SendBookingRequest },
    SendBookingErrorResponse
  >(SEND_BOOKING_MUTATION);
};
