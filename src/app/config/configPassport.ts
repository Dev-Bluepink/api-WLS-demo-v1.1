import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./google";
import UserService from "../service/UserService";
import fs from "fs";
import path from "path";

const userService = new UserService();

const isDistFolderExists = fs.existsSync(
  path.resolve(__dirname, "../../../dist")
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.client_id,
      clientSecret: config.client_secret,
      callbackURL: isDistFolderExists
        ? "https://api-wls-demo-v1-1.onrender.com/auth/google/callback"
        : "http://localhost:10000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("callbackURL: ", isDistFolderExists);
      try {
        const { id, emails, displayName } = profile;
        const email = emails ? emails[0].value : "";
        const username = displayName;

        if (!email || !id) {
          return done(new Error("Email hoặc Google ID không hợp lệ"), false);
        }

        let user = await userService.findUserByGoogleId(email, id);
        if (!user) {
          user = await userService.addUser(email, email, "", id, username);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
