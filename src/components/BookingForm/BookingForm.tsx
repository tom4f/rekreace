import { Route, Routes } from 'react-router-dom'
import { Login, useLoginStatus } from '../../features/login'
import { Form } from './components/Form'
import { Status } from './components/Status'

export const BookingForm = () => {
    const { loginData, setLoginData } = useLoginStatus()

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Form />
                            <Status />
                        </>
                    }
                ></Route>
                <Route
                    path="/edit"
                    element={
                        <>
                            {loginData.isLogged ? (
                                <Status />
                            ) : (
                                <>
                                    <Login setLoginData={setLoginData} />
                                    <Status />
                                </>
                            )}
                        </>
                    }
                ></Route>
            </Routes>
        </div>
    )
}
