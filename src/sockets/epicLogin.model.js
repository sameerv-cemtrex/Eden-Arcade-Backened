const mongoose = require('mongoose');

const schema = mongoose.Schema({
      
    
   
    account: {
        type: String,    
    },
    name: {
        type: String,    
    },
  

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('epicLogin', schema);