import React, { useState } from "react";
import useCryptoContext from "./hooks/useCryptoContext";
import { useAuthContext } from "./hooks/useAuthContext";


const CryptoForm = () => {
    const { dispatch } = useCryptoContext()
    //14.b.
    const { user } = useAuthContext()

    const [token, setToken] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleClick = async (event) => {
        event.preventDefault()

            //14.b. making authorized requests;also the authorization header in line 31
        if (!user) {
            setError('You must be logged in.')
            return
        }

        const crypto = {token, amount}
        

        const response = await fetch('/api/cryptos',{
            method: 'POST',
            body: JSON.stringify(crypto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            const json = await response.json ()

            if (json.error) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }

            if(response.ok) {
                setToken('')
                setAmount('')
                setError(null)
                setEmptyFields([])
                console.log("New transactions made", json);
                dispatch({type: 'CREATE_TRANSACTIONS', payload: json})
            }

        
    }

    return (
            <form className="create" onSubmit={handleClick}>
            <h3>Buy and Sell Crypto</h3>
            <label>Crypto</label>
            <input 
                type="text"
                onChange={(e) => setToken(e.target.value)}
                value={token}
                className={emptyFields.includes('token') ? 'error' : ''}
            />

            <label>Amount</label>
            <input 
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes('amount') ? 'error' : ''}
            />
                <button>Bought</button>
            {error && <div className="error">{error}</div>}
            
            </form>
    )
}

export default CryptoForm