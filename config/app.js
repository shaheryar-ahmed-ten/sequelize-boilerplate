require("dotenv").config()

module.exports = {
    env: {
        provider: 'dotenv'
    },
    auth: {
        encryptKey: process.env.AUTH_KEY.split(",").map(c => parseInt(c)),
        securePath: ["admin", "retailer", "sale", "approver", "driver", "media", "setting", "superadmin", "warehouse"]
    },
    middlewares: [
        { "url": "./middlewares/response", "pos": "before" },
        { "url": "./middlewares/passport-auth", "pos": "before" },
        { "url": "./middlewares/role", "pos": "before" },
        { "url": "./middlewares/error", "pos": "after" },
    ],
    pagination: {
        limit: 20
    },
    // redis: {
    //     host: process.env.REDIS,
    //     port: process.env.REDIS_PORT
    // },
    // mail: {
    //     host: process.env.MAIL_HOST,
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.MAIL_USER, // generated ethereal user
    //         pass: process.env.MAIL_PASSWORD // generated ethereal password
    //     }
    // },
    // route:{
    //     route_token: process.env.ROUTE_TOKEN
    // },
    // storage: {
    //     disk: "storageS3",
    //     key: process.env.AWS_KEY,
    //     secret: process.env.AWS_SECRET,
    //     bucket: process.env.AWS_BUCKET
    // },
    openid: {
        jwt: {
            secretOrKey: process.env.JWT_SECRET,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUD,
            expiresIn: process.env.JWT_EXP
        },
        // facebook: {
        //     clientID: "<Facebook AppId>",
        //     clientSecret: "<Facebook AppSecrent>",
        //     callbackURL: "<Facebook callback>"
        // }, google: {
        //     clientID: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //     callbackURL: process.env.GOOGLE_URL,
        //     domain: "dastgyr.com"
        // }
    }
}


