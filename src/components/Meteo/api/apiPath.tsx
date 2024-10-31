import { urlParams } from '../../PhotoGallery/api/read'

const dev = process.env.NODE_ENV !== 'production'

export const commonPathMeteoFromFile = dev
    ? '/rekreace/static'
    : './../../../..'
export const commonPath = dev ? 'http://www.frymburk.com.local' : './../../..'
// export const commonPath = dev ? 'https://www.frymburk.com' : './../../..'

export const apiPath = `${commonPath}/rekreace/api`
export const imgPath = dev ? '/rekreace/static' : './..'

export const { editStatus } = urlParams.getSearchObj
