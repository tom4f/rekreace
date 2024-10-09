import { apiPath, fotoGalleryOwner } from '../../../Meteo/api/apiPath'
import {
    addCategoryLogicType,
    editCategoryLogicType,
} from './../../types/TypeDefinition'

export const editCategoryLogic: editCategoryLogicType = async (
    event,
    categoryName,
    setAlert
) => {
    event.preventDefault()
    if (!categoryName) return
    setAlert({ header: 'Ukládám změny', text: 'malý moment...', color: 'lime' })

    try {
        const resp = await fetch(`${apiPath}/saveCategoryName.php`, {
            method: 'POST',
            body: JSON.stringify({
                categoryName,
                fotoGalleryOwner,
            }),
        })

        if (resp.status !== 200) {
            throw new Error('Request Failed')
        } else {
            setAlert({ header: 'OK', text: ':-(', color: 'lime' })
        }
    } catch (err: any) {
        setAlert({ header: 'Error', text: err?.message, color: 'red' })
    }
}

export const addCategoryLogic: addCategoryLogicType = async (
    event,
    setCategoryName
) => {
    event.preventDefault()
    console.log(event)
    setCategoryName((orig) => ({ ...orig, 10: 'value' }))
}
