import axios from 'axios'
import { useState } from 'react'
import { ForumParams } from '.'
import { apiPath } from '../../api/paths'

type AddEntryType = {
    paginate: (value: any) => void
    postsPerPage: number
    begin: number
    categoryFromUrl: number
}

export const AddEntry = ({
    paginate,
    postsPerPage,
    begin,
    categoryFromUrl,
}: AddEntryType) => {
    const [state, setState] = useState({
        formVisible: false,
        alert: 'off',
        jmeno: '',
        email: '',
        typ: categoryFromUrl !== 8 ? '' : 8,
        text: '',
        antispam: new Date().getMilliseconds(),
        antispamForm: '',
    })

    const showForum = () => {
        setState((old) => ({ ...old, formVisible: true }))
    }

    const myChangeHandler = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setState((old) => ({ ...old, [event.target.name]: event.target.value }))
    }

    const mySubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.target as any)
        if (state.antispam === Number(data.get('antispamForm'))) {
            axios
                .post(`${apiPath}/pdo_create_forum.php`, state)
                .then((response) => {
                    setState((old) => ({
                        ...old,
                        formVisible: false,
                        alert: 'ok',
                    }))

                    setTimeout(
                        () => setState((old) => ({ ...old, alert: 'off' })),
                        5000
                    )
                    const searchCriteria =
                        categoryFromUrl === 8
                            ? 'WHERE typ = 8'
                            : 'WHERE (typ < 4) OR (typ = 8)'
                    axios
                        .post(
                            `${apiPath}/pdo_read_forum.php`,
                            { searchCriteria: searchCriteria },
                            { timeout: 5000 }
                        )
                        .then((res) => {
                            const allForum = res.data
                            const end = begin + postsPerPage - 1
                            paginate((old: ForumParams) => ({
                                ...old,
                                entries: allForum.slice(begin, end),
                                allEntries: allForum,
                                filteredEntriesBySearch: allForum,
                                begin: 0,
                                refreshCounter: old.refreshCounter + 1,
                            }))
                        })
                        .catch((err) => console.error(err))
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setState((old) => ({
                ...old,
                alert: 'antispamNotOk',
            }))
            setTimeout(
                () => setState((old) => ({ ...old, alert: 'off' })),
                5000
            )
        }
    }

    let button: any
    let alert = null
    alert =
        state.alert === 'ok' ? (
            <h1>Záznam byl přidán !!!</h1>
        ) : state.alert === 'antispamNotOk' ? (
            <h1>Záznam se nepodařilo odeslat !!!</h1>
        ) : null
    const optionList =
        categoryFromUrl !== 8
            ? [
                  <option key="1" value="">
                      {' '}
                      --- vyber kategorii ---
                  </option>,
                  <option key="2" value="0">
                      Fórum
                  </option>,
                  <option key="3" value="1">
                      Inzerce
                  </option>,
                  <option key="4" value="2">
                      Seznamka
                  </option>,
                  <option key="5" value="3">
                      K obsahu stránek
                  </option>,
              ]
            : null
    if (state.formVisible) {
        button = (
            <form
                onSubmit={(e) => mySubmitHandler(e)}
                name="formular"
                encType="multipart/form-data"
            >
                <div id="kniha_formular" className="kniha_formular">
                    <div>
                        <input
                            onChange={(e) => myChangeHandler(e)}
                            type="text"
                            name="jmeno"
                            placeholder="Jméno"
                            size={10}
                            required
                        />
                        <input
                            onChange={myChangeHandler}
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            size={15}
                        />
                        <select
                            onChange={(e) => myChangeHandler(e)}
                            required
                            name="typ"
                        >
                            {optionList}
                            <option value="8">Kaliště 993m n.m.</option>
                        </select>
                    </div>
                    <div>
                        <textarea
                            onChange={(e) => myChangeHandler(e)}
                            rows={5}
                            cols={60}
                            className="text-area"
                            name="text"
                            placeholder="text"
                            required
                        ></textarea>
                    </div>
                    <div>
                        opiš kód :{' '}
                        <input
                            onChange={myChangeHandler}
                            type="text"
                            name="antispamForm"
                            placeholder={state.antispam.toString()}
                            size={5}
                            required
                        />
                    </div>
                </div>
                <input
                    type="submit"
                    name="odesli"
                    defaultValue="Vlož nový příspěvek"
                />
            </form>
        )
    } else {
        button = (
            <button className="button" onClick={showForum}>
                Přidej záznam
            </button>
        )
    }
    return (
        <div>
            {button}
            {alert}
        </div>
    )
}
