const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Google profile:", profile);

                const user = {
                    provider: "google",
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    picture: profile.photos?.[0]?.value,
                };

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ["user:email", "repo"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub profile:", profile);

                const user = {
                    provider: "github",
                    githubId: profile.id,
                    username: profile.username,
                    name: profile.displayName || profile.username,
                    email: profile.emails?.[0]?.value,
                    picture: profile.photos?.[0]?.value || profile._json?.avatar_url,
                    accessToken: accessToken,
                };

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

module.exports = passport;