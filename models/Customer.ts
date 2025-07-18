const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Internal', 'External'], required: true },
  contact_person: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  address: { type: String },
  phone: { type: String },
  email: { type: String }
});

module.exports = mongoose.model('Customer', CustomerSchema);
