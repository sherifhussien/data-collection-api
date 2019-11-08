const Shift = require('mongoose').model('Shift')
const shifts = require('./data/shifts.json');

Shift.create(shifts, ()=> {
    console.log('created shifts')
})

const Match = require('mongoose').model('Match')
const matches = require('./data/matches.json');

Match.create(matches, () => {
    console.log('created macthes')
})



