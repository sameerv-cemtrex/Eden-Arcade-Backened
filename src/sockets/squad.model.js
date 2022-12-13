const mongoose = require('mongoose');

const schema = mongoose.Schema({
    started: {
        type: Number,
        default: 0,
     
       
    },
    inGame: {
        type: Number,
        default: 0,
     
       
    },
    members: {
        type: Array,
        required: false,
        default: []
    },

   
    startTime: {
        type: Number,    
    },
    rival: {
        type: String,    
    },
    code: {
        type: String,    
    },
    team:
    {
        type:Number
    },
   

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Squad', schema);