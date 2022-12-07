
const mongoose = require('mongoose');

const schema = mongoose.Schema({
   
    values: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        default: "",
    },

});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('AttributeStatic', schema);