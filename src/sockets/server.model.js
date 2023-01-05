const mongoose = require('mongoose');

const schema = mongoose.Schema({

 
    id: {
        type: Number,
        default: 0
    },
    members: {
        type: Array,
        default: []
    },
   

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Server', schema);