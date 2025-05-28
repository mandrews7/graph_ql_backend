"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    appName: { type: String },
    storeItems: [{ name: { type: String }, description: { type: String },
            price: { type: Number }, productID: { type: String } }]
});
// 3. Create a Model.
exports.StorefrontModel = (0, mongoose_1.model)('Storefront', schema);
