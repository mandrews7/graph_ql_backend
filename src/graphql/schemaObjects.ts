import { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLInt, 
  GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export{
  userType,
  userQueryType,
  userQuery,
  userLogin,
  userDataObject,
  leaderboard,
  rank
}

///USER OBJECTS
///*********** */
let userType = new GraphQLObjectType({
    name: 'User',
    fields: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      appName: { type: GraphQLString },
      appObjectID: {type: GraphQLString}
    }
});

let userQueryType = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    name: { type: GraphQLString },
  }
});

let userQuery = new GraphQLObjectType({
  name: 'Users',
  fields:{
    allUsers: {type: new GraphQLList(userQueryType)}
  }
})
 
///DATA OBJECT VARS
///************** */
let boolSetting = new GraphQLObjectType({
name: 'BoolSetting',
fields:{
  name: {type: GraphQLString},
  value:{type: GraphQLBoolean}
}
})

let intSetting = new GraphQLObjectType({
name: 'IntSetting',
fields:{
  name: {type: GraphQLString},
  value:{type: GraphQLInt}
}
})

let stringSetting = new GraphQLObjectType({
name: 'StringSetting',
fields:{
  name: {type: GraphQLString},
  value:{type: GraphQLString}
}
})

let floatSetting = new GraphQLObjectType({
name: 'FloatSetting',
fields:{
  name: {type: GraphQLString},
  value:{type: GraphQLFloat}
}
}) 

let vectorSetting = new GraphQLObjectType({
  name: 'VectorSetting',
  fields:{
    name: {type: GraphQLString},
    x:{type: GraphQLFloat},
    y:{type: GraphQLFloat},
    z:{type: GraphQLFloat},
}
}) 

let dataRelationship = new GraphQLObjectType({
  name: 'DataRelationship',
  fields:{
    relatedId: {type: GraphQLString},
    relationshipDescriptions: {type: new GraphQLList(GraphQLString)}
  }
})

let saveState = new GraphQLObjectType({
  name: 'SaveState',
  fields:{
    name: { type: GraphQLString },
    boolSettings: {type: new GraphQLList(boolSetting)},
    intSettings: {type: new GraphQLList(intSetting)},
    stringSettings: {type: new GraphQLList(stringSetting)},
    floatSettings: {type: new GraphQLList(floatSetting)},
    vectorSettings: {type: new GraphQLList(vectorSetting)},
  }
})

let userDataObject = new GraphQLObjectType({
  name: 'DataObject',
  fields:{
  appName: { type: GraphQLString },
  creatorRemoteUUID: { type: GraphQLString},
  boolSettings: {type: new GraphQLList(boolSetting)},
  intSettings: {type: new GraphQLList(intSetting)},
  stringSettings: {type: new GraphQLList(stringSetting)},
  floatSettings: {type: new GraphQLList(floatSetting)},
  vectorSettings: {type: new GraphQLList(vectorSetting)},
  saveStates: {type: new GraphQLList(saveState)},
  dataRelationships:{type: new GraphQLList(dataRelationship)}
  }
})

///LOGIN
///**** */
let userLogin = new GraphQLObjectType({
  name: 'Login',
  fields:{
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    appName: {type: GraphQLString},
    appObjectID: {type: GraphQLString},
    appDataObject: {type: userDataObject},
    userId: { type: GraphQLID },
    token: {type: GraphQLString },
    tokenExpiration: {type: GraphQLInt},
    userDataObject: {type: userDataObject}
  }
})

///Leaderboard
///****** */
let rank = new GraphQLObjectType({
  name: 'Rank',
  fields:{
    appName:{type: GraphQLString},
    boardName:{type: GraphQLString},
    rank: {type: GraphQLInt},
    name: {type: GraphQLString},
    score: {type: GraphQLInt}
  }
})

let leaderboard = new GraphQLObjectType({
  name: 'Leaderboard',
  fields:{
    appName: {type: GraphQLString},
    boardName: {type: GraphQLString},
    ranks: {type: new GraphQLList(rank)},
  }
})


