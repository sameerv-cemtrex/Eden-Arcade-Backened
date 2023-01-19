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
   
    shield: {
        type:Number,
        default: 0
    },
    exp: {
        type:Number,
        default: 0
    },
    resources: {
        type: Object,
        required: false,
        
      },
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('ArmorStatic', schema);