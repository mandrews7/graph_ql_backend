"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schemaResolvers_1 = require("./graphql/schemaResolvers");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
exports.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization');
    //options for all of the methods you want to support with this api
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    //called so that the other routes can take over
    next();
});
exports.app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schemaResolvers_1.graphqlSchema,
    graphiql: true
}));
exports.app.get('/', (req, res) => { res.send("connected to minimal backend!!!"); });
