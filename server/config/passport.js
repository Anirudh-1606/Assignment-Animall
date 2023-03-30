const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: "Incorrect username." });
			}
			user.comparePassword(password, (err, isMatch) => {
				if (err) {
					return done(err);
				}
				if (!isMatch) {
					return done(null, false, { message: "Incorrect password." });
				}
				return done(null, user);
			});
		});
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (error, user) => {
		done(error, user);
	});
});
