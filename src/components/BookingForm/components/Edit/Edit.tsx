import { useState } from 'react'
import { useAlert } from '../../../../features/alert/utils/useAlert'
import {
    StyledForm,
    StyledInput,
    StyledLogin,
    StyledSubmit,
    useLoginStatus,
} from '../../../../features/login'
import { AlertBox } from '../../../AlertBox/AlertBox'
import { sendEditFormBooking } from '../../features/sendEditFormBooking'
import { firstWeekStart } from '../Status/ShowTable'

type EditType = {
    week: number
    apartmentNr: number | null
    formResult: { [key: string]: string | number }[] | null
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setRefetchCount: React.Dispatch<React.SetStateAction<number>>
}

export const Edit = ({
    formResult,
    week,
    apartmentNr,
    setIsEdit,
    setRefetchCount,
}: EditType) => {
    const { alert, setAlert } = useAlert()
    const [gText, setGText] = useState<null | string | number>(
        formResult ? formResult[week][`g${apartmentNr}_text`] : null
    )
    const [gStatus, setGStatus] = useState<null | string | number>(
        formResult ? formResult[week][`g${apartmentNr}_status`] : null
    )

    const {
        loginData: { webAccess, webToken, webUser },
    } = useLoginStatus()

    const send = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (apartmentNr && gStatus && week) {
            const formObject = {
                fotoGalleryOwner: webAccess,
                webToken,
                webUser,
                g_number: apartmentNr,
                g_status: gStatus,
                g_text: gText,
                g_week: week + 1,
            }

            sendEditFormBooking(
                formObject,
                setIsEdit,
                setAlert,
                setRefetchCount
            )
        }
    }

    if (formResult?.length && week && apartmentNr) {
        const terminEdit = `${firstWeekStart(week).date}.${firstWeekStart(week).month}-${firstWeekStart(week + 1).date}.${firstWeekStart(week + 1).month}.${firstWeekStart(week + 1).year}`
        // generate <option> and correct 'selected' value
        const StatusOption = () => {
            let statusArr = [
                'volno',
                'obsazeno',
                'mimo provoz',
                'částečně obsazeno',
                'zaplaceno',
            ]
            let options: any[] = []
            for (let i = 0; i < 5; i++) {
                options = [
                    ...options,
                    <option key={i} value={i}>
                        {statusArr[i]}
                    </option>,
                ]
            }
            return (
                <select
                    name="g_status"
                    onChange={(event) => setGStatus(event.target.value)}
                    defaultValue={gStatus || 0}
                >
                    {options}
                </select>
            )
        }

        return (
            <StyledLogin>
                <AlertBox alert={alert} />
                <form onSubmit={(event) => send(event)} autoComplete="off">
                    <StyledForm>
                        <div>
                            Upravujete termín ({week + 1}) {terminEdit}
                        </div>
                        <input type="hidden" name="g_week" value={week + 1} />
                        <input
                            type="hidden"
                            name="g_number"
                            value={apartmentNr}
                        />

                        <StyledInput>
                            <label>Stav :</label>
                            <StatusOption />
                        </StyledInput>

                        <StyledInput>
                            <label>Text :</label>
                            <input
                                onChange={(event) =>
                                    setGText(event?.target.value)
                                }
                                type="text"
                                name="g_text"
                                value={gText || ''}
                                placeholder="..."
                            />
                        </StyledInput>

                        <StyledSubmit>
                            <input
                                type="submit"
                                name="odesli"
                                value="Odeslat"
                            />
                        </StyledSubmit>
                    </StyledForm>
                </form>
            </StyledLogin>
        )
    }
    return <></>
}
