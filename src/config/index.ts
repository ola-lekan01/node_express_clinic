import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig : any 

if(stage == 'production'){
    envConfig = require('./prod').default
}

else if(stage == 'testing'){
    envConfig = require('./testing').default
}

else {
  envConfig = require("./local").default;
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 4001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)