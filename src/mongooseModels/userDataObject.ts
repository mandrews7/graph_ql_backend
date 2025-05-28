import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose';

interface UserDataObject {
    appName: string;
    creatorRemoteUUID: string;
    boolSettings:[{name: string, value: boolean}]
    intSettings:[{name: string, value: number}]
    floatSettings:[{name: string, value: number}]
    stringSettings:[{name: string, value: string}]
    vectorSettings:[{name: string, x: number, y: number, z: number}]
    saveStates:[{SaveStateName: string,
        boolSettings:[{name: string, value: boolean}]
        intSettings:[{name: string, value: number}]
        floatSettings:[{name: string, value: number}]
        stringSettings:[{name: string, value: string}]
        vectorSettings:[{name: string, x: number, y: number, z: number}]
    }],
    dataRelationships:[{
        relatedId: mongoose.Types.ObjectId,
        relationshipDescriptions: String []
    }]
}
  
const schema = new Schema<UserDataObject>({
    appName: { type: String, required: true},
    creatorRemoteUUID: { type: String, required: true},
    boolSettings:[{name: {type: String}, value: {type: String}}],
    intSettings:[{name: {type: String}, value: {type: Number}}],
    floatSettings:[{name: {type: String}, value: {type: Number}}],
    stringSettings:[{name: {type: String}, value: {type: String}}],
    vectorSettings:[{name: {type: String}, x: {type: Number}, 
        y: {type: Number}, z: {type: Number}}],
    saveStates: [{SaveStateName: String, boolSettings:{name: String, value: Boolean},
        intSettings:{name: String, value: Number},
        floatSettings:{name: String, value: Number},
        stringSettings:{name: String, value: String},
        vectorSettings:{name: String, x: Number, y: Number, z: Number}}],
    dataRelationships:[{
        relatedId:{
        type: mongoose.Types.ObjectId,
        ref: 'CompassDataObject'
    },
    relationshipDescriptions:
        [
            {
                type: String
            }
        ]}]
});

  // 3. Create a Model.
export const UserDataObjectModel = model<UserDataObject>('UserDataObject', schema);