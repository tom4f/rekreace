import { apiPath } from '../../../api/paths'
import { AlertType } from '../../PhotoGallery/TypeDefinition'

type FormObject = {
    fotoGalleryOwner: string
    g_number: number
    g_status: string | number | null
    g_text: string | number | null
    g_week: number
    webToken: string
}

export const sendEditFormBooking = (
    formObject: FormObject,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>
) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', `${apiPath}/pdo_update_booking.php`, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const editResult = JSON.parse(this.responseText)
            setAlert({
                header: 'ok',
                text: editResult.mailResult,
                color: 'lime',
            })

            const delay = () => {
                const timeout = setTimeout(() => {
                    setIsEdit(false)
                }, 2000)
                return () => clearTimeout(timeout)
            }

            delay()
        }
    }
    xhr.onerror = function () {
        const formResultAjaxEror = JSON.parse('{"mailResult" : "ajax_failed"}')
        setAlert({
            header: 'chyba',
            text: formResultAjaxEror.mailResult,
            color: 'red',
        })
    }
    xhr.send(JSON.stringify(formObject))
}
