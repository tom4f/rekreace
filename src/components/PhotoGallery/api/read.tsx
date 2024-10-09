import { apiPath } from '../../Meteo/api/apiPath'

class urlParams {
    static get getSearchObj() {
        const search = window.location.search.substring(1)
        const searchObj: { [key: string]: string } = {}
        const searchArr = search.split('&')
        !!searchArr[0] &&
            searchArr.forEach((ittem) => {
                const [key, value] = ittem.split('=')
                searchObj[key] = value
            })
        return {
            fotoGalleryOwner: searchObj.fotoGalleryOwner || '_ubytovani',
            editStatus: searchObj.edit === 'yes' ? true : false,
            category: searchObj.category === 'yes' ? true : false,
        }
    }
}

export const { fotoGalleryOwner, editStatus, category } = urlParams.getSearchObj

export const loadPicturesfromMySQL = () =>
    fetch(`${apiPath}/pdo_read_foto.php?fotoGalleryOwner=${fotoGalleryOwner}`)
        .then((response) => response.json())
        .catch((response) => console.log({ response }))

export const loadPicturesfromMySQL1 = async () => {
    let resp
    try {
        resp = await fetch(`${apiPath}/pdo_read_foto${fotoGalleryOwner}.php`)
    } catch (err) {
        console.log({ err })
    }
    return resp
}

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
