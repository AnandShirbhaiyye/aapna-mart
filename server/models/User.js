import { Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        default: "-",
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true,
    },

    mobile: {
        type: Number,
        required: true,
        unique: true,   
    },
      
    address: {
        type: String,   
    },

    gender: {
        type: String,  
        default: "Prefer not to say" 
    },
});

const User = model("User", userSchema)

export default User;