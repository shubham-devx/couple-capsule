
const mongoose = require("mongoose");
const dns= require("dns")
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
const capsuleSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
personOne: {
  type: String,
  default: "",
},

personTwo: {
  type: String,
  default: "",
},
    anniversaryDate: {
      type: String,
      default: "",
    },

    memories: [
  {
    title: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capsule", capsuleSchema);