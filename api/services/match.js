const matchDeliveryList = async (shifts, matches) => {

    const result = matches.map((match, idx) => {
        const delivery_date = shifts[idx * 2 + 1].date
        const shift = shifts[idx * 2 + 1].shift
        let is_delayed = false

        if (match.deadline_date < delivery_date || match.deadline_shift < shift) {
            is_delayed = true
        }
        return {
            'id': match.id,
            delivery_date,
            shift,
            is_delayed
        }
    })

    return result
}

const matchDelayCount = async (shifts, matches) => {
    
    let delayed = 0

    matches.forEach((match, idx) => {
        const delivery_date = shifts[idx * 2 + 1].date
        const shift = shifts[idx * 2 + 1].shift

        if (match.deadline_date < delivery_date || match.deadline_shift < shift) {
            delayed += 1
        }
    })

    return delayed
}

module.exports = {
    matchDeliveryList,
    matchDelayCount
}
