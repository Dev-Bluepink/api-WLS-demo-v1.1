import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./google";
import UserService from "../service/UserService";

const userService = new UserService();

passport.use(
  new GoogleStrategy(
    {
      clientID: config.client_id,
      clientSecret: config.client_secret,
      callbackURL: "http://localhost:10000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
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
