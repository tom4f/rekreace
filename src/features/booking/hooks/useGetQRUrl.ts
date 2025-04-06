import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from 'api/utils';

export type GetQRResponse = Blob;

export type QRRequest = {
  accountPrefix?: string;
  accountNumber: string;
  bankCode: string;
  amount: number;
  currency?: 'CZ';
  date?: string;
  vs: number;
  message: string;
  size?: number;
};

const GET_QR_ENDPOINT = `https://api.paylibo.com/paylibo/generator/czech/image`;
const GET_QR_KEY = 'getQR';

const getQR = async (request: QRRequest): Promise<GetQRResponse> => {
  const params = new URLSearchParams();
  if (request?.accountPrefix)
    params.append('accountPrefix', request.accountPrefix);
  if (request?.accountNumber)
    params.append('accountNumber', request.accountNumber);
  if (request?.bankCode) params.append('bankCode', request.bankCode);
  if (request?.amount) params.append('amount', request.amount.toString());
  if (request?.currency) params.append('currency', request.currency);
  if (request?.date) params.append('date', request.date);
  if (request?.vs) params.append('vs', request.vs.toString());
  if (request?.message) params.append('message', request.message);
  if (request?.size) params.append('size', request.size.toString());

  const data = await api.get({
    url: `${GET_QR_ENDPOINT}?${params.toString()}`,
    responseType: 'blob',
  });

  return data;
};

export const useGetQRUrl = (request: QRRequest) => {
  return useQuery({
    queryKey: [GET_QR_KEY, request],
    queryFn: () => getQR(request),
    placeholderData: keepPreviousData,
    select: (imageBlob) => URL.createObjectURL(imageBlob),
  });
};
