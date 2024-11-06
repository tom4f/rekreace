import { useEffect } from 'react'

export const AlertBox = ({
    alert: { header = '', text = '', color = 'red' },
}) => {
    return header ? (
        <article
            className="alert"
            style={{ color, textAlign: 'center', margin: '0' }}
        >
            <header style={{ fontSize: '30px' }}>{`${header}`}</header>
            <header style={{ fontSize: '20px' }}>{text}</header>
        </article>
    ) : (
        <></>
    )
}

export const Delay = (
    alert = { header: '', text: '' },
    setAlert: Function
): void => {
    const delay = () => {
        const timeout = setTimeout(() => {
            setAlert({ header: '', text: '' })
        }, 5000)
        return () => clearTimeout(timeout)
    }
    useEffect(delay, [alert, setAlert])
}
