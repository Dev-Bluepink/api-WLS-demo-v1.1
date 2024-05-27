import User from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class LoginService {
  public async login(
    username: string,
    password: string
  ): Promise<string | null> {
    // Tìm user theo username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}

export default new LoginService();
