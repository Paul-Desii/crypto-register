import React from "react";
import useCryptoContext from './hooks/useCryptoContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "./hooks/useAuthContext";

const CryptoDetails = ({crypto}) => {
    const { dispatch } = useCryptoContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        //14.c. Making authorized requests;also the authorization header in line 16
        if (!user) {
            return
        }
        const response = await fetch ('/api/cryptos/' + crypto._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: "DELETE_TRANSACTIONS", payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{crypto.token}</h4>
            <p><strong>$</strong>{crypto.amount}</p>
            <p>{formatDistanceToNow(new Date(crypto.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick} >Delete</span>
        </div>
    )
}

export default CryptoDetails