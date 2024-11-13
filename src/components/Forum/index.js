import axios from 'axios'
import { Component } from 'react'
import { apiPath } from '../../api/paths'
import AddEntry from './AddEntry'
import './css/forum.css'
import Message from './Forum'
import Paginations from './Paginations'
import PostsPerPage from './PostsPerPage'
import SearchForum from './SearchForum'
import SelectForum from './SelectForum'
import SelectPaginate from './SelectPaginate'

export class Forum extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            selectedCategory:
                window.location.search === '?category=8' ? 8 : 999999,
            buttonText: '0',
            categoryFromUrl:
                window.location.search === '?category=8' ? 8 : 999999,
        }
    }

    // method called after component is rendered
    componentDidMount() {
        let allForum = []
        const searchCriteria =
            this.state.categoryFromUrl === 8
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
                const end = this.state.begin + this.state.postsPerPage - 1
                this.setState({
                    entries: allForum.slice(this.state.begin, end),
                })
                this.setState({
                    allEntries: allForum,
                    filteredEntriesByCategory: allForum,
                    filteredEntriesBySearch: allForum,
                })
            })
            .catch((err) => console.error(err))
    }

    render() {
        // descructing states, e.g. this.state.allEntrie -> allEntries
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
        } = this.state

        // Change page
        const paginate = (begin) => {
            this.setState(begin)
        }

        // calculate filter result
        const filteredEntriesCalculate = (searchText, selectedCategory) => {
            // select category
            const filteredEntriesByCategory =
                selectedCategory === 999999
                    ? allEntries
                    : allEntries.filter((one) => +one.typ === selectedCategory)
            this.setState({
                selectedCategory: selectedCategory,
                filteredEntriesByCategory: filteredEntriesByCategory,
                searchText: searchText,
                begin: 0,
                next: 0,
            })
            // search text
            let filteredForum = filteredEntriesByCategory.filter((alarm) => {
                const regex = new RegExp(`${searchText}`, 'gi')
                return alarm.text.match(regex) || alarm.jmeno.match(regex)
            })
            if (searchText.length === 0)
                this.setState({
                    filteredEntriesBySearch: filteredEntriesByCategory,
                })
            else if (filteredForum.length === 0)
                this.setState({ filteredEntriesBySearch: [] })
            else this.setState({ filteredEntriesBySearch: filteredForum })
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
                            paginate={paginate}
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
                    <div>
                        Je vybráno {filteredEntriesBySearch.length} záznamů.
                    </div>
                    <Message
                        entries={filteredEntriesBySearch.slice(
                            begin,
                            begin + postsPerPage
                        )}
                    />
                    <br />
                    <Paginations
                        paginate={paginate}
                        postsPerPage={postsPerPage}
                        filteredEntriesBySearch={filteredEntriesBySearch}
                        begin={begin}
                        paginateSize={paginateSize}
                        next={next}
                        buttonText={buttonText}
                    />
                    <br />
                    <div className="fields">
                        <SelectPaginate paginate={paginate} />
                        <PostsPerPage
                            filteredEntriesBySearch={filteredEntriesBySearch}
                            paginate={paginate}
                        />
                    </div>
                    <br />
                    <small>Build with React</small>
                    <br />
                </div>
            </div>
        ) // return end
    } // render end
}
