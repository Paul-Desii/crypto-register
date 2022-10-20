import React, { useEffect } from "react";
import useCryptoContext from '../components/hooks/useCryptoContext'

import CryptoDetails from "../components/cryptoTransactions";
import CryptoForm from "../components/cryptoForm";
import { useAuthContext } from '../components/hooks/useAuthContext'

const Home = () => {

    const {cryptos, dispatch} = useCryptoContext()
    //14.a. Making authorized requests; also the authorization headers in fetch fn in line 17
    const { user } = useAuthContext()

    
    useEffect(() => {
        const fetchCryptos = async () => {
            const response = await fetch('/api/cryptos', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
        

        if (response.ok) {
            dispatch({type: 'SET_TRANSACTIONS', payload:json})
        }
        }

        //14.a.
        if (user) {
            fetchCryptos()
        }

        //fetchCryptos();

        
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {cryptos && cryptos.map((crypto) => (
                    <CryptoDetails key={crypto._id} crypto={crypto} />
                ))}
            </div>
            <CryptoForm />
        </div>
    )
}

export default Home