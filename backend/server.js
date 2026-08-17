require("dotenv").config();

console.log("Google Client ID loaded:", !!process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret loaded:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("Google Callback loaded:", !!process.env.GOOGLE_CALLBACK_URL);

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
                googleId: req.user.googleId,
                email: req.user.email,
                name: req.user.name,
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

app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}`);
});