import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

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
    { input: SendBookingRequest }
  >(SEND_BOOKING_MUTATION);
};
