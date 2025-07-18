const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = mongoose.model('Team', TeamSchema);
