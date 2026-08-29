import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        default:"Not Given"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    },
    isEmailVerfied:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
    }

    }
)
const User =mongoose.model("users",userSchema);
export default User;