import { useQuery } from '@tanstack/react-query'
import { apiPath } from '../../../api/paths'
import { api } from '../../../api/utils'

export type GetBookingResponse = {
    week: number
    g1_status: number
    g1_text: string
    g2_status: number
    g2_text: string
    g3_status: number
    g3_text: string
    lastUpdate: string
}[]

export const GET_BOOKING_ENDPOINT = `${apiPath}/pdo_read_booking.php`
export const GET_BOOKING_KEY = 'getBooking'

const getBooking = async (): Promise<GetBookingResponse> => {
    const data = await api.get({
        url: GET_BOOKING_ENDPOINT,
    })

    return data
}

export const useGetBooking = () => {
    return useQuery({
        queryKey: [GET_BOOKING_KEY],
        queryFn: () => getBooking(),
    })
}
