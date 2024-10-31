import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiPath } from '../../Meteo/api/apiPath'
import './css/forum.css'

type Item = {
    id: number
    datum: string
    text: string
    jmeno: string
    email?: string
    typ: number
}

export const Forum = ({
    searchCriteria = '',
    showHeader = true,
}: {
    searchCriteria?: string
    showHeader?: boolean
}) => {
    const [items, setItems] = useState<Item[]>([])

    const loadForumShort = () => {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', `${apiPath}/pdo_read_forum.php`, true)
        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                setItems(JSON.parse(this.responseText))
            }
        }
        xhr.onerror = function () {
            console.log(JSON.parse('{"status" : "ajax_failed"}'))
        }
        xhr.send(
            JSON.stringify({
                start: 0,
                limit: 5,
                searchCriteria,
            })
        )
    }

    const showForum = () => {
        let knihaUL: any[] = []
        items.forEach((item) => {
            const { id, datum, text, jmeno, email } = item
            const [year, month, day] = datum?.split(' ')[0].split('-')
            const mailto = `mailto:${email}`
            knihaUL.push(
                <li key={id}>
                    {day}.{month}.{year}
                    &nbsp;
                    <b>
                        <i>
                            {email ? (
                                <a href={mailto}>{jmeno}</a>
                            ) : (
                                <>{jmeno}</>
                            )}
                        </i>
                    </b>
                    &nbsp;{text.slice(0, 80)}
                </li>
            )
        })
        return knihaUL
    }

    useEffect(loadForumShort, [])

    return (
        <>
            {showHeader && (
                <div className="header">
                    <NavLink className="menu" to="/forum?category=8">
                        LIPNO FÓRUM
                    </NavLink>
                </div>
            )}

            <section className="kniha-main-page">
                <ul>{showForum()}</ul>
            </section>
        </>
    )
}
