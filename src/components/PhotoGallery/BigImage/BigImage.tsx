import { useEffect, useState } from 'react'
import { editStatus } from '../../Meteo/api/apiPath'
import { BigImageType } from '../types/TypeDefinition'
import { EditImage } from './../EditImage/EditImage'
import './BigImages.css'
import { BigImg } from './BigImg.styled'
import { CategoryList } from './CategoryList'
import { ChangeImage } from './ChangeImage'
import { InfoText } from './InfoText'
import { Presentation } from './Presentation'

export const BigImage = ({
    bigPhoto,
    imgPosition,
    setImgPosition,
    categoryObj,
    length,
}: BigImageType) => {
    const [fadeIn, setFadeIn] = useState(true)
    const [editPhoto, setEditPhoto] = useState(bigPhoto)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => setIsEdit(editStatus), [])

    useEffect(() => {
        setFadeIn(true)
        setTimeout(() => setFadeIn(false), 500)
        isEdit && setEditPhoto(bigPhoto)
    }, [bigPhoto, isEdit])

    return (
        <BigImg
            bigPhoto={bigPhoto}
            editPhoto={editPhoto}
            className={`main-img`}
            fadein={fadeIn}
            imgPosition={imgPosition}
        >
            <InfoText bigPhoto={bigPhoto} />
            <ChangeImage
                setImgPosition={setImgPosition}
                length={length}
                imgPosition={imgPosition}
            />
            <Presentation setImgPosition={setImgPosition} length={length} />
            <CategoryList
                setImgPosition={setImgPosition}
                categoryObj={categoryObj}
            />
            {isEdit && (
                <EditImage
                    setImgPosition={setImgPosition}
                    categoryObj={categoryObj}
                    editPhoto={editPhoto}
                    setEditPhoto={setEditPhoto}
                />
            )}
        </BigImg>
    )
}
