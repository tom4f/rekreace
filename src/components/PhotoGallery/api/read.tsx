// import { apiPath, fotoGalleryOwner } from '../../../api/photoGalleryPath'
import { apiPath, fotoGalleryOwner } from '../../../api/paths'

export const loadPicturesfromMySQL = () =>
    fetch(`${apiPath}/pdo_read_foto.php?fotoGalleryOwner=${fotoGalleryOwner}`)
        .then((response) => response.json())
        .catch((response) => console.log({ response }))

export const readCategoryName = async () => {
    let respObj = {}
    try {
        const resp = await fetch(
            `${apiPath}/readCategoryName.php?fotoGalleryOwner=${fotoGalleryOwner}`
        )
        const respText = await resp.text()
        respObj = JSON.parse(respText)['categoryName']
    } catch (err) {
        console.log({ err })
    }
    return respObj
}
