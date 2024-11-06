import { useRef } from 'react'
import styled from 'styled-components'
import { AlertBox } from '../../../components/AlertBox/AlertBox'
import { useAlert } from '../../alert/utils/useAlert'
import { loginLogic } from '../utils/loginLogic'

export type LoginType = {
    setLoginData: React.Dispatch<
        React.SetStateAction<{
            isLogged: boolean
            webToken: string
            webAccess: string
            webUser: string
        }>
    >
}

export const Login = ({ setLoginData }: LoginType) => {
    const { alert, setAlert } = useAlert()

    const form = useRef<HTMLFormElement>(null)

    return (
        <StyledLogin>
            <form
                ref={form}
                onSubmit={(event) =>
                    loginLogic(event, form.current, setAlert, setLoginData)
                }
                name="login"
            >
                <StyledForm>
                    <StyledInput>
                        <label>Uživatel</label>
                        <input
                            name="user"
                            type="text"
                            placeholder="zadejte uživatele"
                            size={10}
                        />
                    </StyledInput>
                    <StyledInput>
                        <label>Heslo</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Zadejte heslo"
                            size={10}
                            autoComplete="off"
                        />
                    </StyledInput>
                    <AlertBox alert={alert} />
                    <StyledSubmit>
                        <input type="submit" name="login" value="Odeslat" />
                    </StyledSubmit>
                </StyledForm>
            </form>
        </StyledLogin>
    )
}

export const StyledLogin = styled.div`
    max-width: 500px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
`

export const StyledForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    border: 1px solid #555;
    padding: 1rem 0;
`
export const StyledInput = styled.div`
    text-align: left;
    background-color: rgba(0, 0, 0, 0.4);
    width: 45%;
    border-radius: 5px;
    border: 1px solid white;
    padding: 2px;
    margin: 5px;

    &:hover {
        border: 1px solid black;
    }

    label {
        font-size: 0.7rem;
        color: white;
        font-weight: bold;
        margin: 2px 5px;
        display: block;
    }

    input,
    select {
        width: 90%;
        font-size: 1rem;
        background-color: transparent;
        border: none;
        margin: 2px 5px;
        color: white;
        letter-spacing: 0.1rem;
    }

    input:focus {
        border: none;
        outline: none;
    }

    input:is(
            :-webkit-autofill,
            :-webkit-autofill:hover,
            :-webkit-autofill:focus,
            :-webkit-autofill:active,
            :autofill,
            :autofill:hover,
            :autofill:focus,
            :autofill:active,

        ) {
        -webkit-text-fill-color: #31b0dd;
        transition: background-color 5000s ease-in-out 0s;
    }

    option {
        background-color: rgba(0, 0, 0, 0.5);
    }
`

export const StyledSubmit = styled.div`
    border-radius: 5px;
    border: 1px solid white;
    margin: 5px;
    width: 40%;

    &:hover {
        border: 1px solid black;
    }

    input {
        color: white;
        background-color: rgba(0, 256, 0, 0.4);
        width: 100%;
        margin: 0;
        padding: 20px;
        border: none;
        font-size: 1rem;
    }

    input:focus {
        background-color: rgba(0, 256, 0, 0.5);
    }
`
