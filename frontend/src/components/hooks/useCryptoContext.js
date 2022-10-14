import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

const useCryptoContext = () => {
    const context = useContext(CryptoContext)

    if (!context) {
        throw Error("useWorkoutsContext must be used inside an WorkoutsContextProvider")
    }
    return context
}

export default useCryptoContext