const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({
    'googleid': profile.id
  }, function (err, user) {
    if (err) return done(err);
    
    if (!user) {
      const user = new User({
        googleid: profile.id,
        name: profile.displayName,
        submitStatus: false
      });

      user.save(function (err) {
        if (err) {
          console.log(err);
          console.log("user save error");
        }

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