const mongoose = require('mongoose');

const schema = mongoose.Schema({

    servers: {
        type: Array,
        default: []
    },
    country: {
        type: String,
        default: "",
        
      },
   
   

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Server', schema);