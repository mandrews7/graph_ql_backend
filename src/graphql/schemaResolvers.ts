import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { UserModel } from '../mongooseModels/user';
import { UserDataObjectModel } from '../mongooseModels/userDataObject';
import mongoose from "mongoose";
import { connect } from 'mongoose';
import { userType, userQuery, userLogin, leaderboard, rank } from "./schemaObjects";
import * as bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { resolve } from "path";
import { LeaderboardModel, RankModel } from "../mongooseModels/leaderboard";
import { rawListeners } from "process";

const connectionString : string = 'mongodb+srv://aetherborn:' + process.env.MONGO_ATLAS_PW + 
'@aether0-vcow3.mongodb.net/' + process.env.REMOTE_DATABASE +'?retryWrites=true';

let queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      Users: {
        type: userQuery,
        async resolve(_, {}) {
          await connect(connectionString)

          let all: typeof UserModel[] = await UserModel.find();
          return {allUsers: all}
        }
      },
      Login:{
        type: userLogin,
        args:{
          email: {type: GraphQLString},
          password: {type: GraphQLString},
          appObjectID:{type: GraphQLString}
        },
        async resolve(_, {email, password, appObjectID}){
          await connect(connectionString);

          //check to see if user exists
          let user = await UserModel.findOne({email: email});
          if(!user){
            throw new Error('User does not exist!')
          }

          //check to see if password matches
          let isEqual : Boolean = await bcrypt.compare(password, user.password);
          if(!isEqual){
            throw new Error('Password is incorrect!');
          }

          let token = await sign({userId: user.id, email: user.email}, 
            'dgt57578rseb111227dsbg$0k++!!mn,nm;bn[],[n;bnm;bb@@@@DsgsgsMMCC0925438473',
          {expiresIn: '1h'});

          //store login
          let userData =  await UserDataObjectModel.findById(appObjectID);
          if(userData){
            let dateTime = new Date()
            let containsLastLogin : boolean = false;
            userData.stringSettings.forEach(element => {
              if(element.name === "lastLogin"){
                  containsLastLogin = true;
                  element.value = dateTime.toString()
              }
            });

            //if lastLogin var doesn't exist already
            if(containsLastLogin === false){
              userData.stringSettings.push({name: "lastLogin", value: dateTime.toString()})
            }
        }

          console.log('user logged in!')
          return { userId: user.id, token: token, tokenExpiration: 1}
        }
        
      },
      UserDataRefresh:{
        type: userLogin,
        args:{
          appName: {type: GraphQLString},
          appObjectID: {type: GraphQLString}
        },

        async resolve(_, {appName, appObjectID}){
          await connect(connectionString);
        let userData =  await UserDataObjectModel.findById(appObjectID);
        if(userData){
          if(userData.appName != appName){
            throw new Error("app name for data does not match request!");
          }
        }

        console.log('user data retrieved!')
        return{userDataObject: userData}
        }
      },
      Leaderboard:{
        type: leaderboard,
        args:{
          appName:{type: GraphQLString},
          boardName:{type: GraphQLString},
        },

        async resolve(_, {appName, boardName}){
          await connect(connectionString);
          let leaderboard = await LeaderboardModel.findOne({appName: appName, boardName: boardName})
          if(leaderboard){return{boardName: leaderboard.boardName, ranks: leaderboard.ranks}}
        }
      }
    }
});

let mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
      //creates New user and a data object for an app
        CreateNewUser:{
            type: userType,
            args:{
                name: {type: GraphQLString},
                email:{type: GraphQLString},
                password:{type: GraphQLString},
                appName: {type: GraphQLString}
            },
            async resolve(_, {name, email, password, appName}) {
            await connect(connectionString);
  
            //encrypt password
            let hashedPassword : string = "";
            await bcrypt.hash(password, 12).then(hash => {
              hashedPassword = hash;
            })
            
            const doc = new UserModel({
                name: name,
                email: email,
                password: hashedPassword
            });

            await doc.save(); //user creation complete

            let newUserId : mongoose.Types.ObjectId = doc._id;

            //create data object for new user
            const dataDoc = new UserDataObjectModel({
              appName: appName,
              creatorRemoteUUID: newUserId,
            })
            
            //user data object creation complete
            await dataDoc.save(); 

            //add data object to newly created user and save
            let newObjId : mongoose.Types.ObjectId = dataDoc._id;
            doc.userDataObjects.push(newObjId);   
            
            console.log("new user created!")
            return {name: doc.name, email: doc.email, password: null, appObjectID: newObjId}
        }
    },
    CreateNewLeaderboard:{
      type: leaderboard,
      args:{
        appName: {type: GraphQLString},
        boardName: {type: GraphQLString}
      },
        async resolve(_, {appName, boardName}){
          await connect(connectionString)

          let doc = new LeaderboardModel({
            appName: appName,
            boardName: boardName
          })

          await doc.save()
          console.log(doc.boardName + 'sucessfully created')
          return{ appName: doc.appName, boardName: doc.boardName}
        }
      }, 
      CreateNewRank:{
        type: rank,
        args:{
          appName: {type: GraphQLString},
          boardName:{type: GraphQLString},
          name: {type: GraphQLString}
        },
        async resolve(_, {appName, boardName, name}){
          await connect(connectionString)

          let leaderboard = await LeaderboardModel.findOne({appName: appName, boardName: boardName})
          if(leaderboard){
            leaderboard.ranks.push({name: name, score: 0, rank: 0})

            await leaderboard.save()
            
            return{ name: name}

          }
        }
      }
    }
})

export const graphqlSchema = new GraphQLSchema({query: queryType, mutation: mutationType});