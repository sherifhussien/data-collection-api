const Match = require('mongoose').model('Match')
const Shift = require('mongoose').model('Shift')

const { matchDeliveryList} = require('../services/match')


const findAll = async (req, res) => {
    try {
        const matches = await Match.find({}, null, { sort: { deadline_date: 1, deadline_shift: 1 } })
        const shifts = await Shift.find({}, null, { sort: { date: 1, shift: 1 } })
        const result = await matchDeliveryList(shifts, matches)
        
        return res.status(201).json(result)

    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred'
            })
    }
}

module.exports = {
    findAll
}
