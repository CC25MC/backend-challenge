/*
    Ruta de files
    host + /files/data
*/
const { Router } = require('express')
const router = Router()
const { getFiles, getListFiles } = require('../controllers/files')

// Rutas
router.get('/data', getFiles)
router.get('/list', getListFiles)

module.exports = router
