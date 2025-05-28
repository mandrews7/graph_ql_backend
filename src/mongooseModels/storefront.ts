import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose';

interface Storefront {
    appName: string;
    storeItems:[{name: string, description: string, price: number, productID: string}]
}
  
const schema = new Schema<Storefront>({
    appName: { type: String },
    storeItems: [ {name: {type: String}, description: {type: String},  
        price:{type: Number}, productID: {type: String}}]
});

// 3. Create a Model.
export const StorefrontModel = model<Storefront>('Storefront', schema);