const iap = require('in-app-purchase');

export {
    ValidatePurchase,
    ReceiptValidationInfo
}

//this is what is what's received from the client
class ReceiptValidationInfo
{
    email = "";
    appName = "";
    appObjectID = "";
    socketID = ""
    data = "";
    signature = "";
}

function ValidatePurchase(info: ReceiptValidationInfo) : Boolean
{
    console.log("validating")
    console.log(info)

    //validate receipt that was received
    //open line to data base
    //update user's userdataobject to contain new purchase
    //raise purchase validated event from socket.io server
    return false;
}

iap.config({

    /* Configurations for HTTP request */
    requestDefaults: { /* Please refer to the request module documentation here: https://www.npmjs.com/package/request#requestoptions-callback */ },

    /* Configurations for Amazon Store */
    amazonAPIVersion: 2, // tells the module to use API version 2
    secret: 'abcdefghijklmnoporstuvwxyz', // this comes from Amazon
    // amazonValidationHost: http://localhost:8080/RVSSandbox, // Local sandbox URL for testing amazon sandbox receipts.

    /* Configurations for Apple */
    appleExcludeOldTransactions: true, // if you want to exclude old transaction, set this to true. Default is false
    applePassword: 'abcdefg...', // this comes from iTunes Connect (You need this to valiate subscriptions)

    /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
    googleServiceAccount: {
        clientEmail: '<client email from Google API service account JSON key file>',
        privateKey: '<private key string from Google API service account JSON key file>'
    },

    /* Configurations for Google Play */
    googlePublicKeyPath: 'path/to/public/key/directory/', // this is the path to the directory containing iap-sanbox/iap-live files
    googlePublicKeyStrSandBox: 'publicKeySandboxString', // this is the google iap-sandbox public key string
    googlePublicKeyStrLive: 'publicKeyLiveString', // this is the google iap-live public key string
    googleAccToken: 'abcdef...', // optional, for Google Play subscriptions
    googleRefToken: 'dddd...', // optional, for Google Play subscritions
    googleClientID: 'aaaa', // optional, for Google Play subscriptions
    googleClientSecret: 'bbbb', // optional, for Google Play subscriptions

    /* Configurations for Roku */
    rokuApiKey: 'aaaa...', // this comes from Roku Developer Dashboard

    /* Configurations for Facebook (Payments Lite) */
    facebookAppId: '112233445566778',
    facebookAppSecret: 'cafebabedeadbeefabcdef0123456789',

    /* Configurations all platforms */
    test: true, // For Apple and Googl Play to force Sandbox validation only
    verbose: true // Output debug logs to stdout stream
});
iap.setup()
  .then(() => {
    // iap.validate(...) automatically detects what type of receipt you are trying to validate
    iap.validate().then(onSuccess).catch(onError);
  })
  .catch((error: any) => {
    // error...
  });

function onSuccess(validatedData: any) {
    // validatedData: the actual content of the validated receipt
    // validatedData also contains the original receipt
    var options = {
        ignoreCanceled: true, // Apple ONLY (for now...): purchaseData will NOT contain cancceled items
        ignoreExpired: true // purchaseData will NOT contain exipired subscription items
    };
    // validatedData contains sandbox: true/false for Apple and Amazon
    var purchaseData = iap.getPurchaseData(validatedData, options);
}

function onError(error: any) {
    // failed to validate the receipt...
}
