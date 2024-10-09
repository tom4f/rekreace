import { imgFolder } from '../../../api/photoGalleryPath'
import './css/SmallImages.css'
import { imgPositionType, photoType, setStateType } from './TypeDefinition'

interface SmallImagesTypes {
    eightPhoto: Array<photoType>
    imgPosition: imgPositionType
    setImgPosition: setStateType

    arrindexfromimgid: (clickedId: number) => number
}

export const SmallImages = ({
    eightPhoto,
    arrindexfromimgid,
    imgPosition,
    setImgPosition,
}: SmallImagesTypes) => {
    const eightImgsDiv = () => {
        if (!eightPhoto) return

        return eightPhoto.map((img) => (
            <div
                key={img.id}
                style={{
                    color: 'white',
                    opacity: `${arrindexfromimgid(+img.id) === imgPosition.current ? 0.5 : 1}`,
                    backgroundImage: `url(${imgFolder}/${img.id}.jpg)`,
                }}
                onClick={() =>
                    setImgPosition((old) => ({
                        ...old,
                        current: arrindexfromimgid(+img.id),
                    }))
                }
            >
                {img.id}
            </div>
        ))
    }

    return <header className="imgs">{eightImgsDiv()}</header>
}
