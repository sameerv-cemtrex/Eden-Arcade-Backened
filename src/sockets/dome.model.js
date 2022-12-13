const mongoose = require('mongoose');

const schema = mongoose.Schema({

    houses: {
        type: Array,
        default: []
    },
    soldHouses: {
        type: Number,
        default: 0
    },
    domeNumber: {
        type: Number,
        default: 0
    },
    members: {
        type: Array,
        default: []
    },
    totalSoldHouses: {
        type: Number,
        default: 0
    },

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Dome', schema);