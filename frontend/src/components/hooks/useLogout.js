//9.a. useLogout
import { useAuthContext } from "./useAuthContext";
import useCryptoContext from "./useCryptoContext"

export const useLogout= () => {
    const { dispatch } = useAuthContext()
    const { dispatch: cryptoDispatch } = useCryptoContext() //16.d.

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        cryptoDispatch({type: 'SET_TRANSACTIONS', payload: null}) //16.d.
    }

    return {logout}
}