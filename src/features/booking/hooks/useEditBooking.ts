import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { GET_BOOKING_KEY } from './useGetBooking';

type EditBookingRequest = {
  fotoGalleryOwner: string;
  webToken: string;
  webUser: string;
  g_number: number;
  g_status: number;
  g_text: string;
  g_week: number;
};

type EditBookingResponse = {
  result: string;
};

export type EditFormBookingErrorResponse = AxiosError & {
  data: { result: string };
};

export const EDIT_BOOKING_ENDPOINT = `${Url.NEW_API}/booking/edit.php`;
export const EDIT_BOOKING_KEY = 'editBooking';

const postEditBooking = async (
  request: EditBookingRequest
): Promise<EditBookingResponse> => {
  const { data } = await api
    .put<EditBookingResponse>({
      url: EDIT_BOOKING_ENDPOINT,
      data: request,
    })
    .catch((error: EditFormBookingErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useEditBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<
    EditBookingResponse,
    EditFormBookingErrorResponse,
    EditBookingRequest
  >({
    mutationFn: postEditBooking,
    mutationKey: [EDIT_BOOKING_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOOKING_KEY] });
    },
  });
};
