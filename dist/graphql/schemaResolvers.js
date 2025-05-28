"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSchema = void 0;
const graphql_1 = require("graphql");
const user_1 = require("../mongooseModels/user");
const userDataObject_1 = require("../mongooseModels/userDataObject");
const mongoose_1 = require("mongoose");
const schemaObjects_1 = require("./schemaObjects");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const leaderboard_1 = require("../mongooseModels/leaderboard");
const connectionString = 'mongodb+srv://aetherborn:' + process.env.MONGO_ATLAS_PW +
    '@aether0-vcow3.mongodb.net/' + process.env.REMOTE_DATABASE + '?retryWrites=true';
let queryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        Users: {
            type: schemaObjects_1.userQuery,
            resolve(_, {}) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    let all = yield user_1.UserModel.find();
                    return { allUsers: all };
                });
            }
        },
        Login: {
            type: schemaObjects_1.userLogin,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
                appObjectID: { type: graphql_1.GraphQLString }
            },
            resolve(_, { email, password, appObjectID }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    //check to see if user exists
                    let user = yield user_1.UserModel.findOne({ email: email });
                    if (!user) {
                        throw new Error('User does not exist!');
                    }
                    //check to see if password matches
                    let isEqual = yield bcrypt.compare(password, user.password);
                    if (!isEqual) {
                        throw new Error('Password is incorrect!');
                    }
                    let token = yield (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, 'dgt57578rseb111227dsbg$0k++!!mn,nm;bn[],[n;bnm;bb@@@@DsgsgsMMCC0925438473', { expiresIn: '1h' });
                    //store login
                    let userData = yield userDataObject_1.UserDataObjectModel.findById(appObjectID);
                    if (userData) {
                        let dateTime = new Date();
                        let containsLastLogin = false;
                        userData.stringSettings.forEach(element => {
                            if (element.name === "lastLogin") {
                                containsLastLogin = true;
                                element.value = dateTime.toString();
                            }
                        });
                        //if lastLogin var doesn't exist already
                        if (containsLastLogin === false) {
                            userData.stringSettings.push({ name: "lastLogin", value: dateTime.toString() });
                        }
                    }
                    console.log('user logged in!');
                    return { userId: user.id, token: token, tokenExpiration: 1 };
                });
            }
        },
        UserDataRefresh: {
            type: schemaObjects_1.userLogin,
            args: {
                appName: { type: graphql_1.GraphQLString },
                appObjectID: { type: graphql_1.GraphQLString }
            },
            resolve(_, { appName, appObjectID }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    let userData = yield userDataObject_1.UserDataObjectModel.findById(appObjectID);
                    if (userData) {
                        if (userData.appName != appName) {
                            throw new Error("app name for data does not match request!");
                        }
                    }
                    console.log('user data retrieved!');
                    return { userDataObject: userData };
                });
            }
        },
        Leaderboard: {
            type: schemaObjects_1.leaderboard,
            args: {
                appName: { type: graphql_1.GraphQLString },
                boardName: { type: graphql_1.GraphQLString },
            },
            resolve(_, { appName, boardName }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    let leaderboard = yield leaderboard_1.LeaderboardModel.findOne({ appName: appName, boardName: boardName });
                    if (leaderboard) {
                        return { boardName: leaderboard.boardName, ranks: leaderboard.ranks };
                    }
                });
            }
        }
    }
});
let mutationType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //creates New user and a data object for an app
        CreateNewUser: {
            type: schemaObjects_1.userType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
                appName: { type: graphql_1.GraphQLString }
            },
            resolve(_, { name, email, password, appName }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    //encrypt password
                    let hashedPassword = "";
                    yield bcrypt.hash(password, 12).then(hash => {
                        hashedPassword = hash;
                    });
                    const doc = new user_1.UserModel({
                        name: name,
                        email: email,
                        password: hashedPassword
                    });
                    yield doc.save(); //user creation complete
                    let newUserId = doc._id;
                    //create data object for new user
                    const dataDoc = new userDataObject_1.UserDataObjectModel({
                        appName: appName,
                        creatorRemoteUUID: newUserId,
                    });
                    //user data object creation complete
                    yield dataDoc.save();
                    //add data object to newly created user and save
                    let newObjId = dataDoc._id;
                    doc.userDataObjects.push(newObjId);
                    console.log("new user created!");
                    return { name: doc.name, email: doc.email, password: null, appObjectID: newObjId };
                });
            }
        },
        CreateNewLeaderboard: {
            type: schemaObjects_1.leaderboard,
            args: {
                appName: { type: graphql_1.GraphQLString },
                boardName: { type: graphql_1.GraphQLString }
            },
            resolve(_, { appName, boardName }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    let doc = new leaderboard_1.LeaderboardModel({
                        appName: appName,
                        boardName: boardName
                    });
                    yield doc.save();
                    console.log(doc.boardName + 'sucessfully created');
                    return { appName: doc.appName, boardName: doc.boardName };
                });
            }
        },
        CreateNewRank: {
            type: schemaObjects_1.rank,
            args: {
                appName: { type: graphql_1.GraphQLString },
                boardName: { type: graphql_1.GraphQLString },
                name: { type: graphql_1.GraphQLString }
            },
            resolve(_, { appName, boardName, name }) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (0, mongoose_1.connect)(connectionString);
                    let leaderboard = yield leaderboard_1.LeaderboardModel.findOne({ appName: appName, boardName: boardName });
                    if (leaderboard) {
                        leaderboard.ranks.push({ name: name, score: 0, rank: 0 });
                        yield leaderboard.save();
                        return { name: name };
                    }
                });
            }
        }
    }
});
exports.graphqlSchema = new graphql_1.GraphQLSchema({ query: queryType, mutation: mutationType });
