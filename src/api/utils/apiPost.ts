import axios, { AxiosResponse } from 'axios'

interface Props {
    url: string
    data?: any
}

export const apiPost = <IResponse = any>({
    url,
    data = {},
}: Props): Promise<AxiosResponse<IResponse>> =>
    new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
