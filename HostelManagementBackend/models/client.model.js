import mongoose from "mongoose"
// import Email from "mongoose-type-email";


const clientSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String},
    otp: {value: Number, expirationtime:Date, isVerified:Boolean},
    complaints: [{ type:mongoose.Schema.Types.ObjectId, ref:"Complaint"}]
})

export default mongoose.model("Client", clientSchema)
