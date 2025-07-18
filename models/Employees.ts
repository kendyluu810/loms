const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ["Online", "Offline"], default: "Offline" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
