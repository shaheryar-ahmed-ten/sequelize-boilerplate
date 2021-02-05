const passport = require("passport");
const { openid } = require("../config/app");
const { dateComp } = require("./date")
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt



const verify_jwt = (jwt_payload, done) => {
    // do some logical thing
    console.log(jwt_payload, jwt_payload.exp, jwt_payload.iat, new Date().getTime())
    if (jwt_payload.aud == openid.jwt.audience) {
        if (dateComp(Math.floor(new Date().getTime() / 1000), jwt_payload.exp, 'gt')) {
            return done(null, jwt_payload.user)
        }
        return done("token has beed expired", null)
    } else {
        return done("un-recognized token", null)
    }
}


const verify = (token, tokenSecret, profile, done) => {
    // do some logical thing
    return done(null, profile)
}

passport.serializeUser((user, done) => {
    // do some logical thing
    return done(null, user)
});

passport.deserializeUser((user, done) => {
    // do some logical thing
    return done(null, user)
})

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: openid.jwt.secretOrKey,
    // issuer: openid.jwt.issuer,
    audience: openid.jwt.audience,
    algorithms: ["HS256"]
}, verify_jwt))

// passport.use(new FacebookStrategy({
//     clientID: openid.facebook.clientID,
//     clientSecret: openid.facebook.clientSecret,
//     callbackURL: openid.facebook.callbackURL
// }, verify))

// passport.use(new GoogleStrategy({
//     clientID: openid.google.clientID,
//     clientSecret: openid.google.clientSecret,
//     callbackURL: openid.google.callbackURL
// }, verify))

module.exports = passport;
