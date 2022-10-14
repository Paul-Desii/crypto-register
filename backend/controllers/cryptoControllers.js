const { default: mongoose } = require ('mongoose')
const CryptoTransaction = require('../models/cryptoModels')

//get all transactions
const getCryptos = async (req, res) => {

    const user_id = req.user._id //16.c. with the user_id in .find in line 9

    const cryptos = await CryptoTransaction.find({ user_id }).sort({createAt: -1})

    res.status(200).json(cryptos)
}

//get a single transaction
const getCrypto = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such transaction.'})
    }

    const crypto = await CryptoTransaction.findById(id)

    if(!crypto) {
        return res.status(404).json({error: 'No such transaction.'})
    }

    res.status(200).json(crypto)
}

//Create transaction
const createCrypto = async(req, res) => {
    const {token, amount} = req.body

    let emptyFields = []
    if (!token) {
        emptyFields.push('token')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (emptyFields.length > 0) {
        res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        const user_id = req.user._id //16.b.
        const crypto = await CryptoTransaction.create({token, amount, user_id})
        res.status(200).json(crypto)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

    
}

//Delete transaction
const deleteCrypto = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:error.message})
    }

    const crypto = await CryptoTransaction.findByIdAndDelete({_id: id})
    if(!crypto){
        return res.status(400).json({error:'No such transaction'})
    }

    res.status(200).json(crypto)
}

//Update transaction?? (No, not needed.)


module.exports = {
    getCryptos,
    getCrypto,
    createCrypto,
    deleteCrypto
}