import { Login, useLoginStatus } from '../../../../features/login'
import { editImage } from '../../TypeDefinition'
import './EditImage.css'
import { Formular } from './Formular'

export const EditImage = ({
    editPhoto,
    setEditPhoto,
    setImgPosition,
    categoryObj,
}: editImage) => {
    const { loginData, setLoginData } = useLoginStatus()

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
