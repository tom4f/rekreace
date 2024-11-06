import { useEffect, useState } from 'react'
import { fotoGalleryOwner } from '../../../components/Meteo/api/apiPath'

export const useLoginStatus = () => {

    const [loginData, setLoginData] = useState({
        isLogged: false,
        webToken: 'error',
        webAccess: 'error',
        webUser: 'error',
    })

    const applySessionStorageLoginData = (): void => {
        const clientJSON = sessionStorage.getItem('client')
        if (!clientJSON) return
        const clientObj = JSON.parse(clientJSON)
        fotoGalleryOwner === clientObj.webAccess && setLoginData(clientObj)
    }

    useEffect(() => applySessionStorageLoginData(), [])

    return {
        loginData,
        setLoginData
    }
}