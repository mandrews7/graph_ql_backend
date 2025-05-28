"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rank = exports.leaderboard = exports.userDataObject = exports.userLogin = exports.userQuery = exports.userQueryType = exports.userType = void 0;
const graphql_1 = require("graphql");
///USER OBJECTS
///*********** */
let userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        appName: { type: graphql_1.GraphQLString },
        appObjectID: { type: graphql_1.GraphQLString }
    }
});
exports.userType = userType;
let userQueryType = new graphql_1.GraphQLObjectType({
    name: 'UserQuery',
    fields: {
        name: { type: graphql_1.GraphQLString },
    }
});
exports.userQueryType = userQueryType;
let userQuery = new graphql_1.GraphQLObjectType({
    name: 'Users',
    fields: {
        allUsers: { type: new graphql_1.GraphQLList(userQueryType) }
    }
});
exports.userQuery = userQuery;
///DATA OBJECT VARS
///************** */
let boolSetting = new graphql_1.GraphQLObjectType({
    name: 'BoolSetting',
    fields: {
        name: { type: graphql_1.GraphQLString },
        value: { type: graphql_1.GraphQLBoolean }
    }
});
let intSetting = new graphql_1.GraphQLObjectType({
    name: 'IntSetting',
    fields: {
        name: { type: graphql_1.GraphQLString },
        value: { type: graphql_1.GraphQLInt }
    }
});
let stringSetting = new graphql_1.GraphQLObjectType({
    name: 'StringSetting',
    fields: {
        name: { type: graphql_1.GraphQLString },
        value: { type: graphql_1.GraphQLString }
    }
});
let floatSetting = new graphql_1.GraphQLObjectType({
    name: 'FloatSetting',
    fields: {
        name: { type: graphql_1.GraphQLString },
        value: { type: graphql_1.GraphQLFloat }
    }
});
let vectorSetting = new graphql_1.GraphQLObjectType({
    name: 'VectorSetting',
    fields: {
        name: { type: graphql_1.GraphQLString },
        x: { type: graphql_1.GraphQLFloat },
        y: { type: graphql_1.GraphQLFloat },
        z: { type: graphql_1.GraphQLFloat },
    }
});
let dataRelationship = new graphql_1.GraphQLObjectType({
    name: 'DataRelationship',
    fields: {
        relatedId: { type: graphql_1.GraphQLString },
        relationshipDescriptions: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
    }
});
let saveState = new graphql_1.GraphQLObjectType({
    name: 'SaveState',
    fields: {
        name: { type: graphql_1.GraphQLString },
        boolSettings: { type: new graphql_1.GraphQLList(boolSetting) },
        intSettings: { type: new graphql_1.GraphQLList(intSetting) },
        stringSettings: { type: new graphql_1.GraphQLList(stringSetting) },
        floatSettings: { type: new graphql_1.GraphQLList(floatSetting) },
        vectorSettings: { type: new graphql_1.GraphQLList(vectorSetting) },
    }
});
let userDataObject = new graphql_1.GraphQLObjectType({
    name: 'DataObject',
    fields: {
        appName: { type: graphql_1.GraphQLString },
        creatorRemoteUUID: { type: graphql_1.GraphQLString },
        boolSettings: { type: new graphql_1.GraphQLList(boolSetting) },
        intSettings: { type: new graphql_1.GraphQLList(intSetting) },
        stringSettings: { type: new graphql_1.GraphQLList(stringSetting) },
        floatSettings: { type: new graphql_1.GraphQLList(floatSetting) },
        vectorSettings: { type: new graphql_1.GraphQLList(vectorSetting) },
        saveStates: { type: new graphql_1.GraphQLList(saveState) },
        dataRelationships: { type: new graphql_1.GraphQLList(dataRelationship) }
    }
});
exports.userDataObject = userDataObject;
///LOGIN
///**** */
let userLogin = new graphql_1.GraphQLObjectType({
    name: 'Login',
    fields: {
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        appName: { type: graphql_1.GraphQLString },
        appObjectID: { type: graphql_1.GraphQLString },
        appDataObject: { type: userDataObject },
        userId: { type: graphql_1.GraphQLID },
        token: { type: graphql_1.GraphQLString },
        tokenExpiration: { type: graphql_1.GraphQLInt },
        userDataObject: { type: userDataObject }
    }
});
exports.userLogin = userLogin;
///Leaderboard
///****** */
let rank = new graphql_1.GraphQLObjectType({
    name: 'Rank',
    fields: {
        appName: { type: graphql_1.GraphQLString },
        boardName: { type: graphql_1.GraphQLString },
        rank: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        score: { type: graphql_1.GraphQLInt }
    }
});
exports.rank = rank;
let leaderboard = new graphql_1.GraphQLObjectType({
    name: 'Leaderboard',
    fields: {
        appName: { type: graphql_1.GraphQLString },
        boardName: { type: graphql_1.GraphQLString },
        ranks: { type: new graphql_1.GraphQLList(rank) },
    }
});
exports.leaderboard = leaderboard;
