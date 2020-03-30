const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumberTemplate = {
  type: Number,
  required: true,
};
const logSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  visitDate: {
    type: Date,
    required: true,
  },
  latitude: {
    ...requiredNumberTemplate,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumberTemplate,
    min: -180,
    max: 180,
  },
}, { timestamps: true });

const LogModel = mongoose.model('Logs', logSchema);
module.exports = LogModel;
