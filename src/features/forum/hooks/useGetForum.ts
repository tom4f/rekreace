import { useQuery } from '@tanstack/react-query'
import { apiPath } from '../../../api/paths'
import { api } from '../../../api/utils'

type OneMessage = {
    id: number
    datum: string
    text: string
    jmeno: string
    email?: string
    typ: number
}

type FormRequest = {
    start: number
    limit: number
    searchCriteria: string
}

export type ForumResponse = OneMessage[]

export const GET_FORUM_ENDPOINT = `${apiPath}/pdo_read_forum.php?{searchCriteria}{start}{limit}`
export const GET_FORUM_KEY = 'getForum'

const getForum = async (request: FormRequest): Promise<ForumResponse> => {
    const data = await api.get({
        url: GET_FORUM_ENDPOINT.replace(
            '{searchCriteria}',
            `&searchCriteria=${request.searchCriteria}`
        )
            .replace('{start}', `&start=${request.start.toString()}`)
            .replace('{limit}', `&limit=${request.limit.toString()}`),
    })

    return data
}

export const useGetForum = (request: FormRequest) => {
    return useQuery({
        queryKey: [GET_FORUM_KEY, request.searchCriteria],
        queryFn: () => getForum(request),
    })
}
