import mongoose from "mongoose";


const DriverSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    status:String
});

const Driver = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);

export default Driver;