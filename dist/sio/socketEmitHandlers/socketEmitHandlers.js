"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptValidationInfo = exports.ValidatePurchase = void 0;
const iap = require('in-app-purchase');
//this is what is what's received from the client
class ReceiptValidationInfo {
    constructor() {
        this.email = "";
        this.appName = "";
        this.appObjectID = "";
        this.socketID = "";
        this.data = "";
        this.signature = "";
    }
}
exports.ReceiptValidationInfo = ReceiptValidationInfo;
function ValidatePurchase(info) {
    console.log("validating");
    console.log(info);
    return false;
}
exports.ValidatePurchase = ValidatePurchase;
iap.config({
    /* Configurations for HTTP request */
    requestDefaults: { /* Please refer to the request module documentation here: https://www.npmjs.com/package/request#requestoptions-callback */},
    /* Configurations for Amazon Store */
    amazonAPIVersion: 2,
    secret: 'abcdefghijklmnoporstuvwxyz',
    // amazonValidationHost: http://localhost:8080/RVSSandbox, // Local sandbox URL for testing amazon sandbox receipts.
    /* Configurations for Apple */
    appleExcludeOldTransactions: true,
    applePassword: 'abcdefg...',
    /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
    googleServiceAccount: {
        clientEmail: '<client email from Google API service account JSON key file>',
        privateKey: '<private key string from Google API service account JSON key file>'
    },
    /* Configurations for Google Play */
    googlePublicKeyPath: 'path/to/public/key/directory/',
    googlePublicKeyStrSandBox: 'publicKeySandboxString',
    googlePublicKeyStrLive: 'publicKeyLiveString',
    googleAccToken: 'abcdef...',
    googleRefToken: 'dddd...',
    googleClientID: 'aaaa',
    googleClientSecret: 'bbbb',
    /* Configurations for Roku */
    rokuApiKey: 'aaaa...',
    /* Configurations for Facebook (Payments Lite) */
    facebookAppId: '112233445566778',
    facebookAppSecret: 'cafebabedeadbeefabcdef0123456789',
    /* Configurations all platforms */
    test: true,
    verbose: true // Output debug logs to stdout stream
});
iap.setup()
    .then(() => {
    // iap.validate(...) automatically detects what type of receipt you are trying to validate
    iap.validate().then(onSuccess).catch(onError);
})
    .catch((error) => {
    // error...
});
function onSuccess(validatedData) {
    // validatedData: the actual content of the validated receipt
    // validatedData also contains the original receipt
    var options = {
        ignoreCanceled: true,
        ignoreExpired: true // purchaseData will NOT contain exipired subscription items
    };
    // validatedData contains sandbox: true/false for Apple and Amazon
    var purchaseData = iap.getPurchaseData(validatedData, options);
}
function onError(error) {
    // failed to validate the receipt...
}
