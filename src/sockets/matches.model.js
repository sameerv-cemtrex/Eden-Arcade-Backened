const mongoose = require('mongoose');

const schema = mongoose.Schema({
   
   
    members: {
        type:Number,
        default: 0
    },
    membersData: {
        type: Array,
        default: []
    },
   
    startTime: {
        type: Number,    
    },
    maximumPlayers: {
        type: Number,    
    },
    code: {
        type: String,    
    },
    roomFull:
    {
        type: Number, 
        default:0
    },
    public:
    {
        type: Number, 
        default:0
    },
    finish:
    {
        type: Number, 
        default:0
    },

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Match', schema);