import { useEffect, useState } from 'react'
import { fotoGalleryOwner } from '../../Meteo/api/apiPath'
import { editImage } from '../types/TypeDefinition'
import './EditImage.css'
import { Formular } from './Formular'
import { Login } from './Login'

export const EditImage = ({
    editPhoto,
    setEditPhoto,
    setImgPosition,
    categoryObj,
}: editImage) => {
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

    return (
        <>
            {loginData.isLogged ? (
                <Formular
                    editPhoto={editPhoto}
                    setEditPhoto={setEditPhoto}
                    loginData={loginData}
                    setImgPosition={setImgPosition}
                    categoryObj={categoryObj}
                />
            ) : (
                <Login setLoginData={setLoginData} />
            )}
        </>
    )
}
