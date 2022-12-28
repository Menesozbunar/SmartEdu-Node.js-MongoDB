import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        require: true

    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ["student","teacher","admin"],
        // default:"student"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Course`
    }]
    
});
UserSchema.pre(`save`,function(next){
    const user =this;
     bcrypt.hash(user.password,10,(eroor,hash)=>{
        user.password=hash;
        next();
     })
})


const User = mongoose.model('User', UserSchema)
export default User;