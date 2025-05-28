"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataObjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const schema = new mongoose_2.Schema({
    appName: { type: String, required: true },
    creatorRemoteUUID: { type: String, required: true },
    boolSettings: [{ name: { type: String }, value: { type: String } }],
    intSettings: [{ name: { type: String }, value: { type: Number } }],
    floatSettings: [{ name: { type: String }, value: { type: Number } }],
    stringSettings: [{ name: { type: String }, value: { type: String } }],
    vectorSettings: [{ name: { type: String }, x: { type: Number },
            y: { type: Number }, z: { type: Number } }],
    saveStates: [{ SaveStateName: String, boolSettings: { name: String, value: Boolean },
            intSettings: { name: String, value: Number },
            floatSettings: { name: String, value: Number },
            stringSettings: { name: String, value: String },
            vectorSettings: { name: String, x: Number, y: Number, z: Number } }],
    dataRelationships: [{
            relatedId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: 'CompassDataObject'
            },
            relationshipDescriptions: [
                {
                    type: String
                }
            ]
        }]
});
// 3. Create a Model.
exports.UserDataObjectModel = (0, mongoose_2.model)('UserDataObject', schema);
