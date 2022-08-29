import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
    name:{type:String, required:true},
    hostelName:{type:String, required:true},
    issueCategory:{type:String, required:true},
    availiability:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    description:String,
    handlingOfficer:Number,
    date:Date,
    lastEscalate: Date,
    status:String
})

const Complaint = mongoose.model("Complaint", complaintSchema)

export default Complaint