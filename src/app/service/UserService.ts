import UserModel from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";

class UserService {
  async addUser(username: string, email: string, password: string) {
    //Kiểm tra xem username và email đã tồn tại chưa
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new Error("Username hoặc email đã tồn tại");
    }

    const hashedPassword = hashPassword(password);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
  }

  async findUserByUsername(username: string) {
    //Kiểm tra xem username có hợp lệ không
    if (!username) {
      throw new Error("Username không hợp lệ");
    }
    return UserModel.findOne({ username });
  }

  async findUserById(idUser: string) {
    if (!idUser) {
      throw new Error("Id user không hợp lệ");
    }
    return UserModel.findById(idUser);
  }

  async validateUser(username: string, password: string) {
    //Kiểm tra xem username và password có hợp lệ không
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new Error("User không tồn tại");
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password không đúng");
    }
    return true;
  }
}

export default UserService;
