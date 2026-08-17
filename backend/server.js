require("dotenv").config();

console.log("Google Client ID loaded:", !!process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret loaded:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("Google Callback loaded:", !!process.env.GOOGLE_CALLBACK_URL);
console.log("GitHub Client ID loaded:", !!process.env.GITHUB_CLIENT_ID);
console.log("GitHub Client Secret loaded:", !!process.env.GITHUB_CLIENT_SECRET);
console.log("GitHub Callback loaded:", !!process.env.GITHUB_CALLBACK_URL);

const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const jwt = require("jsonwebtoken");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running",
    });
});

// Google OAuth
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/login",
    }),
    (req, res) => {
        const token = jwt.sign(
            {
                provider: "google",
                googleId: req.user.googleId,
                email: req.user.email,
                name: req.user.name,
                picture: req.user.picture,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.redirect(
            `http://localhost:5173/oauth-success?token=${token}`
        );
    }
);

// GitHub OAuth
app.get(
    "/auth/github",
    passport.authenticate("github", {
        scope: ["user:email", "repo"],
    })
);

app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "http://localhost:5173/login",
    }),
    (req, res) => {
        const token = jwt.sign(
            {
                provider: "github",
                githubId: req.user.githubId,
                username: req.user.username,
                email: req.user.email,
                name: req.user.name,
                picture: req.user.picture,
                accessToken: req.user.accessToken,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.redirect(
            `http://localhost:5173/oauth-success?token=${token}`
        );
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});