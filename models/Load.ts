const LoadSchema = new mongoose.Schema({
  loadNumber: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  equipment: { type: String, required: true },
  rate: { type: Number, required: true },
  weight: { type: Number, required: true },
  status: { type: String, enum: ['Posted', 'Delivered'], default: 'Posted' }
});

module.exports = mongoose.model('Load', LoadSchema);
