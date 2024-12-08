import { useMutation } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';
import { AxiosError } from 'axios';

export type SendBookingRequest = {
  apartment: string;
  persons: string;
  check_in: string;
  check_out: string;
  email: string;
  phone: string;
  name: string;
  confirm_via: string;
  address: string;
  info: string;
  antispam_code: number;
  antispam_code_orig: number;
};

export type SendResponse = {
  result: string;
};

type SendBookingErrorResponse = AxiosError & {
  response: {
    data: { result: string };
  };
};

export const SEND_BOOKING_ENDPOINT = `${Url.NEW_API}/booking/send.php`;
export const SEND_BOOKING_KEY = 'sendBooking';

const postSendBooking = async (
  request: SendBookingRequest
): Promise<SendResponse> => {
  const { data } = await api
    .post({
      url: SEND_BOOKING_ENDPOINT,
      data: request,
    })
    .catch((error: SendBookingErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useSendBooking = () => {
  return useMutation<
    SendResponse,
    SendBookingErrorResponse,
    SendBookingRequest
  >({
    mutationFn: postSendBooking,
    mutationKey: [SEND_BOOKING_KEY],
  });
};
