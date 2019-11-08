const mongoose = require('mongoose')

const shiftSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    shift: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


mongoose.model('Shift', shiftSchema)