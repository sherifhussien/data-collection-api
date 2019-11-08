const Shift = require('mongoose').model('Shift')
const Match = require('mongoose').model('Match')

const { matchDelayCount } = require('../services/match')


const getAllCollecterShifts = async (req, res) => {
    if (!req.body.user_id) {
        return res.status(400)
            .json({
                message: `user_id is not provided`
            })
    }

    try {
        const shifts = await Shift.find({user_id: req.body.user_id})

        return res.status(200)
            .json({
                message: shifts
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || `Some error occurred while getting shifts for user: ${user_id}`
            })
    }
}

const create = async (req, res) => {

    if (!(req.body.user_id && req.body.shift && req.body.date)) {
        return res.status(400)
            .json({
                message: `user_id, date and shift should be provided`
            })
    }
    
    try {
        await Shift.create({
            user_id: req.body.user_id,
            shift: req.body.shift,
            date: new Date(req.body.date)
        })

        return res.status(201)
            .json({
                message: `OK!`
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || `Some error occurred while creating shift`
            })
    }
}

const deleteOne = async (req, res) => {
    try {
        let shifts = await Shift.find({}, null, { sort: { date: 1, shift: 1 } })
        const matches = await Match.find({}, null, { sort: { deadline_date: 1, deadline_shift: 1 } })
        const old_delay = await matchDelayCount(shifts, matches)

        const shift = await Shift.findByIdAndRemove(req.params.shiftId)

        shifts = await Shift.find({}, null, { sort: { date: 1, shift: 1 } })
        const new_delay = await matchDelayCount(shifts, matches)

        if (!shift) {
            return res.status(404).json({
                message: 'shift not found with id ' + req.params.shiftId
            });
        }

        if (new_delay > old_delay) {
            await Shift.create({
                date: shift.date,
                shift: shift.shift,
                user_id: shift.user_id
            })
            return res.status(200)
                .json({
                    message: `Denied!`
                })
        }

        return res.status(200)
            .json({
                message: `OK!`
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || `Some error occurred while deleting shift`
            })
    }
}


const updateOne = async (req, res) => {

    try {
        let shifts = await Shift.find({}, null, { sort: { date: 1, shift: 1 } })
        const matches = await Match.find({}, null, { sort: { deadline_date: 1, deadline_shift: 1 } })
        const old_delay = await matchDelayCount(shifts, matches)

        const shift = await Shift.findByIdAndUpdate(req.params.shiftId, req.body)

        if (!shift) {
            return res.status(404).json({
                message: "shift not found with id " + req.params.shiftId
            });
        }

        shifts = await Shift.find({}, null, { sort: { date: 1, shift: 1 } })
        const new_delay = await matchDelayCount(shifts, matches)

        if (new_delay > old_delay) {
            await Shift.findByIdAndUpdate(req.params.shiftId, shift)
            
            return res.status(200)
                .json({
                    message: `Denied!`
                })
        }

        return res.status(200)
            .json({
                message: `OK!`
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || `Some error occurred while updating shift`
            })
    }
}



module.exports = {
    getAllCollecterShifts,
    create,
    deleteOne,
    updateOne
}

