import { Schema,model,models } from "mongoose";

const UserSchema = new Schema ({
    email:{
        type:String,
        unique: [true,'Email already exists!'],
        required: [true,'Email is required'],
    },
    username:{
       type: String,
       required: [true,'Username is required'],
       match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,"Username is invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String,
    }
});

const User = models.User || model("User",UserSchema);
// looks into models.User and if it is not there then only create the new model else dont create it as this route get called from sctrach every time the connection is made  
export default User;

// The "models" object is provided by the Mongoose Library and stores all the registered models.
// If a model name "User" already exist in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefyning the model and ensures that the existing model is reused.
// If a model named "User" does not exist in the "models" object the "model" function from Mongoose is called to create a new model
//the newly created model is then assigned to the "User " variable

// const User = model("User",UserSchema);
// export default User;
// this will be done in the Express Backend which always runs but next.js runs only when it is called