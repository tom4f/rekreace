import { apiPath } from '../../Meteo/api/apiPath'
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
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
    setRefetchCount: React.Dispatch<React.SetStateAction<number>>
) => {
    // disable page reload-clear after submit

    console.log(formObject)

    // // all form data to special object
    // const form = document.querySelector('#edit_form_booking');
    // const FD = new FormData(form);
    // FD.append('fotoGalleryOwner', fotoGalleryOwner);
    // FD.append('webToken', webToken);
    // // real object
    // const FDobject = {};
    // // fill form data ojbect
    // FD.forEach( (value, key) => FDobject[key] = value );
    // // AJAX
    {
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
                // setIsEdit(false)
                // show OK green alert box
                // formResultAlert(editResult, 'form_edit_alert');
                // set querySelector for all <td>
                // setTimeout( UI.setQuerySelector , 1000 );

                const delay = () => {
                    const timeout = setTimeout(() => {
                        setIsEdit(false)
                        setRefetchCount((counter) => ++counter)
                    }, 2000)
                    return () => clearTimeout(timeout)
                }

                delay()
            }
        }
        xhr.onerror = function () {
            const formResultAjaxEror = JSON.parse(
                '{"mailResult" : "ajax_failed"}'
            )
            setAlert({
                header: 'chyba',
                text: formResultAjaxEror.mailResult,
                color: 'red',
            })
        }
        xhr.send(JSON.stringify(formObject))
    }
    // UI.display('form_edit_alert', 'none')
}
