import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { loadPicturesfromMySQL } from './api/read'
import { BigImage } from './components/BigImage/BigImage'
import { SmallImages } from './components/SmallImages'
import './css/App.css'
import { allPhotoType, categoryObjType } from './TypeDefinition'

export function PhotoGallery({ category }: { category?: number }) {
    const { pathname } = useLocation()
    const [allPhoto, setAllPhoto] = useState<allPhotoType[]>([])
    const [imgPosition, setImgPosition] = useState({
        smallImgStart: 0,
        smallImgsSize: 8,
        current: 0,
        category: category || 99999,
        reload: 0,
    })

    useEffect(() => {
        ;(async () => setAllPhoto(await loadPicturesfromMySQL()))()
    }, [imgPosition.reload])

    const arrIndexFromImgId = (clickedImgId: number): number =>
        filteredPhoto.findIndex((img) => +img['id'] === clickedImgId)

    const filteredPhoto =
        imgPosition.category === 99999
            ? allPhoto
            : allPhoto.filter((one) => +one['typ'] === imgPosition.category)

    const bigPhoto = filteredPhoto[imgPosition.current]

    const eightPhoto = filteredPhoto.slice(
        imgPosition.smallImgStart,
        imgPosition.smallImgStart + imgPosition.smallImgsSize
    )

    const reducer = (sumPerCat: categoryObjType, oneEntry: allPhotoType) => {
        sumPerCat[oneEntry.typ] =
            oneEntry.typ in sumPerCat ? ++sumPerCat[oneEntry.typ] : 1
        return sumPerCat
    }

    const categoryObj: { [key: string]: number } = {
        ...allPhoto.reduce(reducer, { 99999: allPhoto.length }),
    }

    return (
        <div className="container">
            <div className="header">
                {pathname === '/' || pathname === '/kaliste' ? (
                    <NavLink className="menu" to="/fotogalerie">
                        Fotogalerie
                    </NavLink>
                ) : (
                    <NavLink className="menu" to="/">
                        Start
                    </NavLink>
                )}
            </div>
            <SmallImages
                imgPosition={imgPosition}
                setImgPosition={setImgPosition}
                eightPhoto={eightPhoto}
                arrIndexFromImgId={arrIndexFromImgId}
            />
            <BigImage
                imgPosition={imgPosition}
                setImgPosition={setImgPosition}
                bigPhoto={bigPhoto}
                categoryObj={categoryObj}
                length={filteredPhoto.length}
                setAllPhoto={setAllPhoto}
            />
        </div>
    )
}
