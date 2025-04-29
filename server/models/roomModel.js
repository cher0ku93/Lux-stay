const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
  },
  roomNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
  },
  features: {
    wifi: {
      type: Boolean,
      default: false, // Par défaut, pas de Wi-Fi
    },
    airConditioning: {
      type: Boolean,
      default: false,
    },
    tv: {
      type: Boolean,
      default: false,
    },
    hairDryer: {
      type: Boolean,
      default: false,
    },
    maxCapacity: {
      type: Number,
      default: 2, 
    },
    breakfastIncluded: {
      type: Boolean,
      default: false, 
    },
    parking: {
      type: Boolean,
      default: false, 
    },
    massageSpa: {
      type: Boolean,
      default: false, 
    },
    swimmingPool: {
      type: Boolean,
      default: false, 
    },
    kingSizeBed: {
      type: Boolean,
      default: false, 
    },
    italianShower: {
      type: Boolean,
      default: false, // Douche italienne non incluse par défaut
    },
    roomService: {
      type: Boolean,
      default: false, // Room service non activé par défaut
    },
    minibar: {
      type: Boolean,
      default: false, // Minibar non inclus par défaut
    },
    balcony: {
      type: Boolean,
      default: false, // Balcon non inclus par défaut
    },
    seaView: {
      type: Boolean,
      default: false, // Vue sur mer désactivée par défaut
    },
    safeBox: {
      type: Boolean,
      default: false, // Coffre-fort non inclus par défaut
    },
    jacuzzi: {
      type: Boolean,
      default: false, // Jacuzzi non inclus par défaut
    },
    privateTerrace: {
      type: Boolean,
      default: false, // Terrasse privée non incluse par défaut
    },
  },
  
});

module.exports = mongoose.model("Room", roomSchema);
