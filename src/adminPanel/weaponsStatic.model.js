const mongoose = require('mongoose');

const schema = mongoose.Schema({
   
    type: {
        type: String,
        default: "",
    },
    id: {
        type:Number,
        default: "",
    },
    gunFireMode: {
        type: String,
        default: "",
    },
    screenShakeIntensity: {
        type:Number,
        default: 0
    },
    screenShakeDuration: {
        type:Number,
        default: 0
    },
    ammoType: {
        type:Number,
        default: 0
    },
    fireSpread: {
        type:Number,
        default: 0
    },

    damage: {
        type:Number,
        default: 0
    },

    magazineSize: {
        type:Number,
        default: 0
    },
    gunShotIntensity: {
        type:Number,
        default: 0
    },
    shootingRange: {
        type:Number,
        default: 0
    },

    muzzleFlashIntensity: {
        type:Number,
        default: 0
    },
    recoil: {
        type:Number,
        default: 0
    },
    fireRate: {
        type:Number,
        default: 0
    },
    reloadTime: {
        type:Number,
        default: 0
    },

    bulletShotAudioClip: {
        type: String,
        default: "",
    },
    bulletHolePrefab: {
        type: String,
        default: "",
    },

    name: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },
    exp: {
        type:Number,
        default: 0
    },
    weight: {
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

module.exports = mongoose.model('WeaponStatic', schema);