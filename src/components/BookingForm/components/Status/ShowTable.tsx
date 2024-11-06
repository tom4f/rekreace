import { useState } from 'react'
import { useLoginStatus } from '../../../../features/login'
import { Modal } from '../../../Modal/Modal'
import { Edit } from '../Edit/Edit'
import './css/showTable.css'

interface formResultType {
    formResult: { [key: string]: string }[] | null
    setRefetchCount: React.Dispatch<React.SetStateAction<number>>
}

export const firstWeekStart = (week = 0) => {
    let firstSat
    const year = new Date().getFullYear()
    const today = new Date().getTime()
    const firstDay = new Date(year, 0).getDay()
    // Get the firt day of year + get day of week : 0 (Sunday) to 6 (Saturday)
    const plusDays = firstDay >= 0 && firstDay < 5 ? 0 : 7
    firstSat = new Date(year, 0, 7 * week - firstDay + plusDays)

    return {
        date: `0${firstSat.getDate()}`.slice(-2),
        month: `0${firstSat.getMonth() + 1}`.slice(-2),
        year: firstSat.getFullYear(),
        actualWeek: Math.floor(
            (today - firstSat.getTime()) / (1000 * 60 * 60 * 24 * 7)
        ),
    }
}

export const ShowTable = ({ formResult, setRefetchCount }: formResultType) => {
    const [apartmentNr, setApartmentNr] = useState<number | null>()
    const [clickedWeek, setClickedWeek] = useState<number | null>()
    const [isEdit, setIsEdit] = useState(false)

    const {
        loginData: { isLogged },
    } = useLoginStatus()

    // get clickedWeek and related appartementNr
    const editTermin = (event: any) => {
        if (!isLogged) return null
        const clickedTd = event.target
        const childsTd = clickedTd.parentNode.children
        // previous <td>
        let prevTd = clickedTd
        let apartmentNrTemp = 0
        // instead 'while'
        for (let i = childsTd.length - 1; i > 0; i--) {
            if (prevTd.previousElementSibling) {
                prevTd = prevTd.previousElementSibling

                apartmentNrTemp++
            }
        }

        // get clicked week from first column, e.g. 27 from (27) 27.06-04.07.2020
        const clickedWeekTemp =
            +childsTd[0].innerText.split(')')[0].substring(1) - 1

        if (apartmentNrTemp) {
            setApartmentNr(apartmentNrTemp)
            setClickedWeek(clickedWeekTemp)
            setIsEdit(true)
        }
    }

    const bgColor = [
        {},
        { backgroundColor: 'rgba(255, 208,   0, 0.9)' },
        { backgroundColor: 'rgba(255,   0,   0, 0.9)' },
        { backgroundColor: 'rgba(202, 202, 202, 0.9)' },
        { backgroundColor: 'rgba(  0, 255,   0, 0.9)' },
    ]

    const createTr = (week: number) => {
        if (!formResult?.length) return <></>

        const weekModified =
            week < formResult.length ? week : week - formResult.length

        const { date: dateStart, month: monthStart } = firstWeekStart(week)
        const {
            date: dateEnd,
            month: monthEnd,
            year: yearEnd,
        } = firstWeekStart(week + 1)
        const termin = `(${weekModified + 1}) ${dateStart}.${monthStart}-${dateEnd}.${monthEnd}.${yearEnd}`
        return (
            <tr key={week}>
                <td onClick={editTermin}>{termin}</td>
                <td
                    onClick={editTermin}
                    style={bgColor[+formResult[weekModified]['g1_status']]}
                >
                    {' '}
                    {formResult[weekModified]['g1_text']}
                </td>
                <td
                    onClick={editTermin}
                    style={bgColor[+formResult[weekModified]['g2_status']]}
                >
                    {' '}
                    {formResult[weekModified]['g2_text']}
                </td>
                <td
                    onClick={editTermin}
                    style={bgColor[+formResult[weekModified]['g3_status']]}
                >
                    {' '}
                    {formResult[weekModified]['g3_text']}
                </td>
            </tr>
        )
    }

    const allTr: JSX.Element[] = []
    if (!formResult?.length) return null
    for (
        let week = firstWeekStart(0).actualWeek;
        week < firstWeekStart(0).actualWeek + formResult.length;
        week++
    ) {
        allTr.push(createTr(week))
    }

    return (
        <>
            {isEdit && clickedWeek && apartmentNr && (
                <Modal
                    customStyle={{ width: '500px', height: '300px' }}
                    setIsVisible={setIsEdit}
                    children={
                        <>
                            <Edit
                                week={clickedWeek}
                                apartmentNr={apartmentNr}
                                formResult={formResult}
                                setIsEdit={setIsEdit}
                                setRefetchCount={setRefetchCount}
                            />
                        </>
                    }
                />
            )}
            <table className="booking_table">
                <thead>
                    <tr>
                        <th>Datum (týden so-so)</th>
                        <th>Apartmán č.1</th>
                        <th>Apartmán č.2</th>
                        <th>Apartmán č.3</th>
                    </tr>
                </thead>
                <tbody>{allTr}</tbody>
            </table>
        </>
    )
}
