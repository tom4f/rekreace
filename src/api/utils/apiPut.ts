import axios, { AxiosError, AxiosResponse } from 'axios'

interface Props {
    url: string
    data?: any
}

export const apiPut = <IResponse = any>({
    url,
    data = {},
}: Props): Promise<AxiosResponse<IResponse>> =>
    new Promise((resolve, reject) => {
        axios
            .put(url, data, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then((response) => {
                resolve(response)
            })
            .catch((error: AxiosError) => {
                reject(error.response)
            })
    })
