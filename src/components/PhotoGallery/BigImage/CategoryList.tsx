import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { readCategoryName } from '../api/read'
import {
    categoryNameType,
    categoryObjType,
    setStateType,
} from './../types/TypeDefinition'
import './CategoryList.css'

interface eightPhotoTypes {
    setImgPosition: setStateType
    categoryObj: categoryObjType
}

export const CategoryList = ({
    setImgPosition,
    categoryObj,
}: eightPhotoTypes) => {
    const [showCategory, setShowCategory] = useState(false)
    const [categoryName, setCategoryName] = useState<categoryNameType | null>(
        null
    )

    const category = []

    for (const [key, value] of Object.entries(categoryObj)) {
        const changeCategory = () =>
            setImgPosition((prev) => ({
                ...prev,
                category: +key,
                smallImgStart: 0,
                current: 0,
            }))
        category.push(
            <div className="oneCategory" key={key} onClick={changeCategory}>
                <header>{categoryName?.[+key] ?? 'loading'}</header>
                <article>{value}</article>
            </div>
        )
    }

    useEffect(() => {
        ;(async () => setCategoryName(await readCategoryName()))()
    }, [])

    return (
        <>
            <FontAwesomeIcon
                className="category"
                icon={faAlignJustify}
                onMouseOver={() => setShowCategory(true)}
            />
            {showCategory ? (
                <div
                    className="categoryList"
                    onMouseLeave={() => setShowCategory(false)}
                >
                    <fieldset>
                        <legend>Kategorie / počet fotek</legend>
                        <section style={{ flexDirection: 'column' }}>
                            {category}
                        </section>
                    </fieldset>
                </div>
            ) : null}
        </>
    )
}
