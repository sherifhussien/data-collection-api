const shiftController = require('../controllers/shift')
const router = require('express').Router()

router.use((req, res, next) => {
    console.log('Shift Router...')
    next()
})

router.route('/')
    .get(shiftController.getAllCollecterShifts)
    .post(shiftController.create)

router.route('/:shiftId')
    .delete(shiftController.deleteOne)
    .put(shiftController.updateOne)

module.exports = router