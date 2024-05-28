import * as express from "express";
const router = express.Router();
import passport from "../config/configPassport";
import { login, register, loginFB } from "../controller/AuthController";

router.post("/register", register);
router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  loginFB
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/"); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
  });
});
// Route để bắt đầu xác thực với Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Route để xử lý callback từ Facebook
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
