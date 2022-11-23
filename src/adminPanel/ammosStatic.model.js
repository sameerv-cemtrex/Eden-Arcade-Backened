const mongoose = require('mongoose');

const schema = mongoose.Schema({
   
    name: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },
    id: {
        type:Number,
        default: 0
    },
    type: {
        type:Number,
        default: 0
    },
    weight: {
        type:Number,
        default: 0
    },
   
    damage: {
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

module.exports = mongoose.model('AmmosStatic', schema);