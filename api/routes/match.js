const matchController = require('../controllers/match')
const router = require('express').Router()

router.use((req, res, next) => {
    console.log('Match Router...')
    next()
})

router.route('/')
    .get(matchController.findAll)


module.exports = router