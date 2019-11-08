const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
    deadline_date: {
        type: Date,
        required: true
    },
    deadline_shift: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


mongoose.model('Match', matchSchema)