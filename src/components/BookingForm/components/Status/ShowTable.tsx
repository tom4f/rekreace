import { useState } from 'react'
import { GetBookingResponse } from '../../../../features/booking/hooks'
import { useLoginStatus } from '../../../../features/login'
import { Modal } from '../../../Modal/Modal'
import { Edit } from '../Edit/Edit'
import './css/showTable.css'

type FormResultType = {
    formResult: GetBookingResponse
}

export const firstWeekStart = (week = 0) => {
    const year = new Date().getFullYear()
    const today = new Date().getTime()
    const firstDay = new Date(year, 0).getDay() // 1 = Monday
    // Get the firt day of year + get day of week : 0 (Sunday) to 6 (Saturday)
    const plusDays = firstDay >= 0 && firstDay < 5 ? 0 : 7
    const firstSat = new Date(year, 0, 7 * week + firstDay + plusDays - 2)
    const actualWeek = Math.ceil(
        (today - firstSat.getTime()) / (1000 * 60 * 60 * 24 * 7)
    )

    return {
        date: `0${firstSat.getDate()}`.slice(-2),
        month: `0${firstSat.getMonth() + 1}`.slice(-2),
        year: firstSat.getFullYear(),
        actualWeek,
    }
}

export const ShowTable = ({ formResult }: FormResultType) => {
    const [apartmentNr, setApartmentNr] = useState<1 | 2 | 3>()
    const [dbWeek, setDbWeek] = useState<number>()
    const [isEdit, setIsEdit] = useState(false)

    const {
        loginData: { isLogged },
    } = useLoginStatus()

    const editTermin = (event: React.MouseEvent<HTMLTableCellElement>) => {
        if (!isLogged) return null
        if (!event) return null
        const clickedTd = event.target as HTMLTableCellElement
        const childsTd = clickedTd.parentNode?.children
        if (!childsTd) return null
        if (!clickedTd) return null
        let apartmentNr = clickedTd.cellIndex
        // get clicked week from first column, e.g. 27 from (27) 27.06-04.07.2020
        const clickedWeek = childsTd[0].textContent?.match(/\((.*?)\)/)

        if (apartmentNr && clickedWeek?.length) {
            setApartmentNr(apartmentNr as 1 | 2 | 3)
            setDbWeek(+clickedWeek[1])
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
            week < formResult.length ? week : week - formResult.length + 1
        const { date: dateStart, month: monthStart } = firstWeekStart(week - 1)
        const {
            date: dateEnd,
            month: monthEnd,
            year: yearEnd,
        } = firstWeekStart(week)
        const termin = `(${weekModified}) ${dateStart}.${monthStart}-${dateEnd}.${monthEnd}.${yearEnd}`
        const weekArrIndex = weekModified - 1
        return (
            <tr key={week}>
                <td>{termin}</td>
                <td
                    onClick={(e) => editTermin(e)}
                    style={bgColor[+formResult[weekArrIndex]['g1_status']]}
                >
                    {formResult[weekArrIndex]['g1_text']}
                </td>
                <td
                    onClick={editTermin}
                    style={bgColor[+formResult[weekArrIndex]['g2_status']]}
                >
                    {formResult[weekArrIndex]['g2_text']}
                </td>
                <td
                    onClick={editTermin}
                    style={bgColor[+formResult[weekArrIndex]['g3_status']]}
                >
                    {formResult[weekArrIndex]['g3_text']}
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
            {isEdit && dbWeek && apartmentNr && (
                <Modal
                    customStyle={{ width: '500px', height: '300px' }}
                    setIsVisible={setIsEdit}
                    children={
                        <>
                            <Edit
                                week={dbWeek}
                                apartmentNr={apartmentNr}
                                formResult={formResult}
                                setIsEdit={setIsEdit}
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
