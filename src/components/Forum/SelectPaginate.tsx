import { ForumParams } from './Forum'

export type Paginate = {
    paginate: (value: any) => void
}

export const SelectPaginate = ({ paginate }: Paginate) => {
    const selectPaginate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const paginateSize = Number(event.target.value)
        paginate((old: ForumParams) => ({
            ...old,
            paginateSize: paginateSize,
        }))
    }

    return (
        <select
            required
            name="selectPaginate"
            onChange={(e) => selectPaginate(e)}
        >
            <option value="10">stránkování</option>
            <option value="5"> 5</option>
            <option value="10">10</option>
            <option value="50">50</option>
        </select>
    )
}
