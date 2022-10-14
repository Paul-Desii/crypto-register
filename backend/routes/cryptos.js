const express = require('express')

const { getCryptos, getCrypto, createCrypto, deleteCrypto } = require('../controllers/cryptoControllers')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//13.b. protecting API routes - and we are requiring auth for all workout routes
router.use(requireAuth)

router.get('/', getCryptos)

router.get('/:id', getCrypto)

router.post('/', createCrypto)

router.delete('/:id', deleteCrypto)

module.exports = router