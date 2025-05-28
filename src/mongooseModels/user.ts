import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose';

export interface User {
    name: string;
    email: string;
    password: string;
    userDataObjects: mongoose.Types.ObjectId[]
    avatar: string;
}
  
const schema = new Schema<User>({
    name: { type: String, required: true, unique: true },
    email: 
    { 
        type: String, 
        required: true, 
        unique: true,
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type: String, required: true},
    userDataObjects: [{
        type: mongoose.Types.ObjectId,
        ref: 'UserDataObject'
    }]
});

  // 3. Create a Model.
export const UserModel = model<User>('User', schema);