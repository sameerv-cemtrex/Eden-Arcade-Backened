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
    lootDropped: {
        type: Number, 
        default:0   
    },
    currentInventoryId: {
        type: Number, 
        default:0   
    },
    code: {
        type: String,    
    },
   
    currentMembers: {
        type: Array,
        required: false,
        default: []
    },
    end:
    {
        type: Number, 
        default:0
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
    inventoryInGame: {
        type: Array,
        required: false,
        default: []
      },
      drones: {
        type: Array,
        required: false,
        default: []
      }
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('SquadMatch', schema);