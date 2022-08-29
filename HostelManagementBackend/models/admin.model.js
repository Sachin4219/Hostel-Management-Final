import mongoose from "mongoose"
import Email from "mongoose-type-email";


const adminSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true}
})

const Admin = mongoose.model("Admin", adminSchema)

export default Admin