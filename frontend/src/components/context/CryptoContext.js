import React, { createContext, useReducer } from "react";

export const CryptoContext = createContext()

export const cryptoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {
                cryptos: action.payload
            }
        case 'CREATE_TRANSACTIONS':
            return{
                cryptos: [action.payload, ...state.cryptos]
            }
        case 'DELETE_TRANSACTIONS':
            return{
                cryptos: state.cryptos.filter((c) => c._id !== action.payload._id)
            }
    
        default:
            return state;
    }
}

export const CryptoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(cryptoReducer, {
        cryptos: null
    })

    return (
        <CryptoContext.Provider value={{...state, dispatch}}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContextProvider


