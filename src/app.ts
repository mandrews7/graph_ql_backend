import express, {Application, Request, Response} from "express"
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { graphqlSchema } from "./graphql/schemaResolvers";

export const app: Application = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization'
    );

    //options for all of the methods you want to support with this api
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }

    //called so that the other routes can take over
    next();
});

app.use ('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
}))

app.get('/',(req: Request, res: Response) => { res.send("connected to minimal backend!!!")})