const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: '1096297752556-uhgelcu1um8ri9n337qr4dd3hubsgbjt.apps.googleusercontent.com', //fill out when you deploy
  clientSecret: '9F5WiGEG8NGbQoB-R-YtpXd6', //fill out when you deploy
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({
    'googleid': profile.id
  }, function (err, user) {
    if (err) {
        return done(err);
        console.log("err");
    }
    if (!user) {
      user = new User({
        name: profile.displayName,
        googleid: profile.id
      });

      user.save(function (err) {
        if (err) console.log(err);

        return done(err, user);
        console.log("new user made");
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;