const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    
    notificationRequest: {
        type: Array,
        required: false,
        default: []
    },
    requestsSend: {
        type: Array,
        required: false,
        default: []
    },
   friends: {
        type: Array,
        required: false,
        default: []
    },
   
    

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('UserPack', schema);