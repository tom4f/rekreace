import { SmallImagesTypes } from './../types/TypeDefinition'
import './SmallImages.css'
import { StyledDiv } from './StyledDiv.styled'

export const SmallImages = ({
    eightPhoto,
    arrindexfromimgid,
    imgPosition,
    setImgPosition,
}: SmallImagesTypes) => {
    return (
        <header className="imgs">
            {eightPhoto?.map((img) => (
                <StyledDiv
                    key={img.id}
                    imgid={img.id}
                    imgtype={img.imgType}
                    arrindexfromimgid={arrindexfromimgid}
                    imgPosition={imgPosition}
                    onClick={() =>
                        setImgPosition((old) => ({
                            ...old,
                            current: arrindexfromimgid(+img.id),
                        }))
                    }
                />
            ))}
        </header>
    )
}
