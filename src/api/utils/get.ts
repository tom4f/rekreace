import axios, { AxiosError, isAxiosError } from 'axios'

type PostErrorType = {
    status: string
    message: string
    type: string
    errors: string[]
}

type Props = {
    url: string
}

export async function apiGet({ url }: Props) {
    try {
        const response = await axios.get<any>(url, {})
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<PostErrorType> = error
            return err.response
        }
    }
}
