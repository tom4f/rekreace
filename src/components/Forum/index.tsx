import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { apiPath } from '../../api/paths'
import { AddEntry } from './AddEntry'
import './css/forum.css'
import Message from './Forum'
import Paginations from './Paginations'
import PostsPerPage from './PostsPerPage'
import SearchForum from './SearchForum'
import SelectForum from './SelectForum'
import { SelectPaginate } from './SelectPaginate'

type OneMessage = {
    id: number
    datum: string
    text: string
    jmeno: string
    email?: string
    typ: number
}

export type ForumParams = {
    allEntries: OneMessage[]
    filteredEntriesByCategory: OneMessage[]
    filteredEntriesBySearch: OneMessage[]
    entries: any[]
    begin: number
    postsPerPage: number
    paginateSize: number
    next: number
    searchText: string
    selectedCategory: number
    buttonText: string
    categoryFromUrl: number
    refreshCounter: number
}

export const Forum = () => {
    const [state, setState] = useState<ForumParams>({
        allEntries: [],
        filteredEntriesByCategory: [],
        filteredEntriesBySearch: [],
        entries: [],
        begin: 0,
        postsPerPage: 5,
        paginateSize: 10,
        next: 0,
        searchText: '',
        // filter based on url
        selectedCategory: window.location.search === '?category=8' ? 8 : 999999,
        buttonText: '0',
        categoryFromUrl: window.location.search === '?category=8' ? 8 : 999999,
        refreshCounter: 0,
    })

    const fetchForum = useCallback(() => {
        let allForum: OneMessage[] = []
        const searchCriteria =
            state.categoryFromUrl === 8
                ? 'WHERE typ = 8'
                : 'WHERE (typ < 4) OR (typ = 8)'
        axios
            .post(
                `${apiPath}/pdo_read_forum.php`,
                { searchCriteria: searchCriteria },
                { timeout: 5000 }
            )
            .then((res) => {
                // allForum = JSON.parse(res.data); --> for native xhr.onload
                allForum = res.data
                const end = state.begin + state.postsPerPage - 1
                setState((orig) => ({
                    ...orig,
                    entries: allForum.slice(state.begin, end),
                }))
                setState((orig) => ({
                    ...orig,
                    allEntries: allForum,
                    filteredEntriesByCategory: allForum,
                    filteredEntriesBySearch: allForum,
                }))
            })
            .catch((err) => console.error(err))
    }, [state])

    useEffect(fetchForum, [fetchForum])

    // descructing states, e.g. state.allEntrie -> allEntries
    const {
        allEntries,
        filteredEntriesBySearch,
        begin,
        postsPerPage,
        paginateSize,
        next,
        searchText,
        selectedCategory,
        buttonText,
        categoryFromUrl,
    } = state

    // calculate filter result
    const filteredEntriesCalculate = (
        searchText: string,
        selectedCategory: number
    ) => {
        // select category
        const filteredEntriesByCategory =
            selectedCategory === 999999
                ? allEntries
                : allEntries.filter((one) => +one.typ === selectedCategory)
        setState((orig) => ({
            ...orig,
            selectedCategory,
            filteredEntriesByCategory,
            searchText,
            begin: 0,
            next: 0,
        }))
        // search text
        let filteredForum = filteredEntriesByCategory.filter((alarm) => {
            const regex = new RegExp(`${searchText}`, 'gi')
            return alarm.text.match(regex) || alarm.jmeno.match(regex)
        })
        if (searchText.length === 0)
            setState((orig) => ({
                ...orig,
                filteredEntriesBySearch: filteredEntriesByCategory,
            }))
        else if (filteredForum.length === 0)
            setState((orig) => ({
                ...orig,
                filteredEntriesBySearch: [],
            }))
        else
            setState((orig) => ({
                ...orig,
                filteredEntriesBySearch: filteredForum,
            }))
    }

    return (
        <div className="top_container">
            <div className="center">
                <div className="header">
                    <b>Lipenské fórum</b>
                </div>
                <br />
                <div className="btn-group">
                    <AddEntry
                        paginate={setState}
                        postsPerPage={postsPerPage}
                        begin={begin}
                        categoryFromUrl={categoryFromUrl}
                    />
                </div>
                <p style={{ clear: 'both' }}></p>
                <br />
                <div className="fields">
                    <SearchForum
                        filteredEntriesCalculate={filteredEntriesCalculate}
                        selectedCategory={selectedCategory}
                    />
                    <SelectForum
                        filteredEntriesCalculate={filteredEntriesCalculate}
                        categoryFromUrl={categoryFromUrl}
                        searchText={searchText}
                    />
                </div>
                <div>Je vybráno {filteredEntriesBySearch?.length} záznamů.</div>
                <Message
                    entries={filteredEntriesBySearch?.slice(
                        begin,
                        begin + postsPerPage
                    )}
                />
                <br />
                <Paginations
                    paginate={setState}
                    postsPerPage={postsPerPage}
                    filteredEntriesBySearch={filteredEntriesBySearch}
                    begin={begin}
                    paginateSize={paginateSize}
                    next={next}
                    buttonText={buttonText}
                />
                <br />
                <div className="fields">
                    <SelectPaginate paginate={setState} />
                    <PostsPerPage
                        filteredEntriesBySearch={filteredEntriesBySearch}
                        paginate={setState}
                    />
                </div>
                <br />
                <small>Build with React</small>
                <br />
            </div>
        </div>
    ) // return end
} // render end
