const dev = process.env.NODE_ENV !== 'production'

export const commonPathMeteoFromFile = dev
    ? '/rekreace/static'
    : './../../../..'
export const commonPath = dev ? 'http://localhost' : './../../..'
// export const commonPath = dev ? 'http://www.frymburk.com.local' : './../../..'
// export const commonPath = dev ? 'https://www.frymburk.com' : './../../..'

export const apiPath = `${commonPath}/rekreace/api`
export const imgPath = dev ? '/rekreace/static' : './..'

export class urlParams {
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
        }
    }
}

export const { fotoGalleryOwner, editStatus } = urlParams.getSearchObj

export const imgFolder = `${commonPath}/rekreace/fotogalerie${fotoGalleryOwner}`

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
