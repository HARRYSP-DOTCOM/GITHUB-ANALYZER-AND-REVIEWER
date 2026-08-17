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
app.get("/auth/google", (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.status(500).json({
            error: "Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend/.env",
        });
    }
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })(req, res, next);
});

app.get(
    "/auth/google/callback",
    (req, res, next) => {
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
            return res.redirect("http://localhost:5173/login?error=google_not_configured");
        }
        passport.authenticate("google", {
            session: false,
            failureRedirect: "http://localhost:5173/login",
        })(req, res, next);
    },
    (req, res) => {
        const token = jwt.sign(
            {
                provider: "google",
                googleId: req.user.googleId,
                email: req.user.email,
                name: req.user.name,
                picture: req.user.picture,
            },
            process.env.JWT_SECRET || "fallback_secret_key",
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
app.get("/auth/github", (req, res, next) => {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        return res.status(500).json({
            error: "GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in backend/.env",
        });
    }
    passport.authenticate("github", {
        scope: ["user:email", "repo"],
    })(req, res, next);
});

app.get(
    "/auth/github/callback",
    (req, res, next) => {
        if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
            return res.redirect("http://localhost:5173/login?error=github_not_configured");
        }
        passport.authenticate("github", {
            session: false,
            failureRedirect: "http://localhost:5173/login",
        })(req, res, next);
    },
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
            process.env.JWT_SECRET || "fallback_secret_key",
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