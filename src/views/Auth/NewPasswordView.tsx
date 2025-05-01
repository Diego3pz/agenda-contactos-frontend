import { useState } from "react"
import NewPasswordToken from "../../components/Auth/NewPasswordToken"
import NewPasswordForm from "../../components/Auth/NewPasswordForm"
import { ConfirmToken } from "../../types"



export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            {!isValidToken ?
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
                :
                <NewPasswordForm token={token} />
            }
        </>
    )
}
