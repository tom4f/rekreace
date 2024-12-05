import { useMutation } from "@tanstack/react-query"; // Correct import for React Query v3+
import { Url } from "../../../api/paths";
import { api } from "../../../api/utils";
import { AxiosError } from "axios";

export type SendMessageRequest = {
  emailova_adresa: string;
  text: string;
  antispam_code: number;
  antispam_code_orig: number;
};

export type SendMessageResponse = {
  result: string;
};

type SendMessageErrorResponse = AxiosError & {
  response: {
    data: { result: string };
  };
};

export const SEND_MESSAGE_ENDPOINT = `${Url.API}/ajax_form_kontakt.php`;
export const SEND_MESSAGE_KEY = "sendMessage";

const postSendMessage = async (
  request: SendMessageRequest
): Promise<SendMessageResponse> => {
  const { data } = await api
    .post({
      url: SEND_MESSAGE_ENDPOINT,
      data: request,
    })
    .catch((error: SendMessageErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useSendMessage = () => {
  return useMutation<
    SendMessageResponse,
    SendMessageErrorResponse,
    SendMessageRequest
  >({
    mutationFn: postSendMessage,
    mutationKey: [SEND_MESSAGE_KEY],
  });
};
