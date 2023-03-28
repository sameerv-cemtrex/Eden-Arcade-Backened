const mongoose = require('mongoose');

const schema = mongoose.Schema({
    attachements: {
        type: Array,
        required: false,
        default: []

    },
    level: {
        type: Number,
        default: 0
    },
    gunType: {
        type: String,
     
    },
    playersKilled: {
        type: Number,
        default: 0
    },
    accuracyRating: {
        type: Number,
        default: 0
    },
    ergonomicsRating: {
        type: Number,
        default: 0
    },
    fireRateRating: {
        type: Number,
        default: 0
    },
    firingSoundRating: {
        type: Number,
        default: 0
    },
    firingVFXRating: {
        type: Number,
        default: 0
    },
    RangeRating: {
        type: Number,
        default: 0
    },
    recoilRating: {
        type: Number,
        default: 0
    },
    reliabilityRating: {
        type: Number,
        default: 0
    },
    reloadSpeedRating: {
        type: Number,
        default: 0
    },
    ownerId: {
        type: String,
        default: 0
    },


});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Gun', schema);