const mongoose = require('mongoose');

const schema = mongoose.Schema({
   
    name: {
        type: String,
        default: "",
    },
    id: {
        type:Number,
        default: 0
    },
    desc: {
        type: String,
        default: "",
    },
    level: {
        type:Number,
        default: 0
    },
    enemy: {
        type:Number,
        default: 0
    },
    health: {
        type:Number,
        default: 0
    },
   
    damage: {
        type:Number,
        default: 0
    },

    fireRate: {
        type:Number,
        default: 0
    },

    range: {
        type:Number,
        default: 0
    },
    movementSpeed: {
        type:Number,
        default: 0
    },
    exp: {
        type:Number,
        default: 0
    },
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('NpcStatic', schema);