import UserModel from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import CustomError from "../utils/customError";

class UserService {
  async addUser(
    username: string,
    email: string,
    password: string,
    googleId?: string,
    fullname?: string
  ) {
    //Kiểm tra xem username và email đã tồn tại chưa
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      // Nếu người dùng đăng nhập bằng Google và email đã tồn tại, cập nhật googleId
      if (googleId && existingUser.email === email) {
        existingUser.googleId = googleId;
        existingUser.fullname = fullname;
        await existingUser.save();
        return existingUser;
      }
      const errorMessage = "Username hoặc email đã tồn tại";
      throw new CustomError(409, errorMessage); // 409 Conflict
    }
    const hashedPassword = hashPassword(password);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      fullname,
      googleId,
    });
    await newUser.save();
    return newUser;
  }

  async findUserByUsername(username: string) {
    //Kiểm tra xem username có hợp lệ không
    if (!username) {
      const errorMessage = "Username không hợp lệ";
      throw new CustomError(400, errorMessage); // 400 Bad Request
    }
    return UserModel.findOne({ username });
  }

  async findUserById(idUser: string) {
    if (!idUser) {
      const errorMessage = "Id user không hợp lệ";
      throw new CustomError(400, errorMessage); // 400 Bad Request
    }
    return UserModel.findById(idUser);
  }

  async validateUser(username: string, password: string) {
    //Kiểm tra xem username và password có hợp lệ không
    const user = await this.findUserByUsername(username);
    if (!user) {
      const errorMessage = "User không tồn tại";
      throw new CustomError(404, errorMessage); // 404 Not Found
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      const errorMessage = "Password không đúng";
      throw new CustomError(401, errorMessage); // 401 Unauthorized
    }
    return true;
  }

  async findUserByFacebookId(facebookId: string) {
    return UserModel.findOne({ facebookId });
  }

  async findUserByGoogleId(googleId: string) {
    // Logic để tìm người dùng bằng Google ID
    return await UserModel.findOne({ googleId });
  }
}

export default UserService;
