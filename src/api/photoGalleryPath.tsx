import { apiPath, commonPath } from '../components/Meteo/api/apiPath'

const fotoGalleryOwner =
    window.location.search.split('?fotoGalleryOwner=')[1] || '_ubytovani'

export const imgFolder = `${commonPath}/rekreace/fotogalerie${fotoGalleryOwner}`

export const loadPicturesfromMySQL = fetch(
    `${apiPath}/pdo_read_foto.php?fotoGalleryOwner=${fotoGalleryOwner}`
)
    .then((response) => response.json())
    .catch((response) => console.log({ response }))

export const categoryName: { [key: number]: string } = {
    0: 'Ubytování',
    1: 'Lipenská přehrada',
    2: 'Příroda',
    3: 'Obce',
    4: 'Historie',
    5: 'Sport',
    6: 'Ostatní',
    10: 'Kaliště - kniha',
    11: 'Kaliště',
    99999: 'Všechny',
}
