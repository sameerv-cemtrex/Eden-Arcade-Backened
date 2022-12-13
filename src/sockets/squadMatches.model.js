const mongoose = require('mongoose');

const schema = mongoose.Schema({
      
    members: {
        type: Array,
        default: []
    },
    eventDataByClient: {
        type: Array,
        default: []
    },
    zone: {
        type: Array,
        default: []
    },
    startTime: {
        type: Number,    
    },
   
    code: {
        type: String,    
    },
   
    currentMembers: {
        type: Array,
        required: false,
        default: []
    },
   
    finish:
    {
        type: Number, 
        default:0
    },
    level:
    {
        type:Number,
        default: 0,
    },

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('SquadMatch', schema);