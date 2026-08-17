const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/auth/google/callback",
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
} else {
    console.warn("⚠️ Google OAuth credentials missing in .env (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)");
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:5000/auth/github/callback",
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
} else {
    console.warn("⚠️ GitHub OAuth credentials missing in .env (GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET)");
}

module.exports = passport;