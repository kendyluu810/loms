const TrackingSchema = new mongoose.Schema({
  load: { type: mongoose.Schema.Types.ObjectId, ref: 'Load' },
  currentLocation: { type: String },
  nextStop: { type: String },
  distanceToDelivery: { type: Number },
  expectedDeliveryTime: { type: Date },
  status: { type: String, enum: ['In Delivery', 'Late'] }
});

module.exports = mongoose.model('Tracking', TrackingSchema);
