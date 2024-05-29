import UserModel from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import CustomError from "../utils/customError";
import mongoose from "mongoose";

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

  async findUserByGoogleId(email: string, googleId: string) {
    if (!email || !googleId) {
      const errorMessage = "Email hoặc Google ID không hợp lệ";
      throw new CustomError(400, errorMessage); // 400 Bad Request
    }

    const checkMail = await UserModel.findOne({ email });
    if (checkMail) {
      if (checkMail.googleId === googleId) {
        return checkMail;
      } else {
        const updatedUser = await UserModel.findOneAndUpdate(
          { email },
          { googleId },
          { new: true }
        );
        if (!updatedUser) {
          const errorMessage = "Không thể cập nhật Google ID";
          throw new CustomError(500, errorMessage); // 500 Internal Server Error
        }
        return updatedUser;
      }
    } else {
      const errorMessage = "Email không tồn tại";
      throw new CustomError(404, errorMessage); // 404 Not Found
    }
  }

  async getAllUser() {
    try {
      const users = await UserModel.find({});
      if (!users || users.length === 0) {
        throw new CustomError(404, "Không tìm thấy người dùng nào"); // 404 Not Found
      }
      return users;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ"); // 500 Internal Server Error
      }
    }
  }

  async getUser(idUser: string) {
    if (!idUser) {
      const errorMessage = "Id user không hợp lệ";
      throw new CustomError(400, errorMessage); // 400 Bad Request
    }
    const user = await UserModel.findById(idUser);
    if (!user) {
      const errorMessage = "Người dùng không tồn tại";
      throw new CustomError(404, errorMessage); // 404 Not Found
    }
    return user;
  }

  async updateUser(
    idUser: string,
    username?: string,
    email?: string,
    password?: string,
    fullname?: string,
    avatar?: string,
    role?: string
  ) {
    if (!idUser) {
      const errorMessage = "Id user không hợp lệ";
      throw new CustomError(400, errorMessage); // 400 Bad Request
    }

    const updateFields: any = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) updateFields.password = hashPassword(password);
    if (fullname) updateFields.fullname = fullname;
    if (avatar) updateFields.avatar = avatar;
    if (role) updateFields.role = role;
    try {
      if (Object.keys(updateFields).length === 0) {
        const errorMessage = "Không có trường nào được cập nhật";
        throw new CustomError(400, errorMessage); // 400 Bad Request
      }
      if (username) {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
          const errorMessage = "Username đã tồn tại";
          throw new CustomError(409, errorMessage); // 409 Conflict
        }
      }
      if (email) {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          const errorMessage = "Email đã tồn tại";
          throw new CustomError(409, errorMessage); // 409 Conflict
        }
      }
      const updatedUser = await UserModel.findByIdAndUpdate(
        idUser,
        updateFields,
        {
          new: true,
        }
      );
      if (!updatedUser) {
        const errorMessage = "Người dùng không tồn tại";
        throw new CustomError(404, errorMessage); // 404 Not Found
      }
      return updatedUser;
    } catch (error) {
      throw new CustomError(500, "Lỗi máy chủ nội bộ"); // 500 Internal Server Error
    }
  }

  async toggleUserStatus(idUser: string) {
    if (!idUser) {
      const errorMessage = "Id user không hợp lệ";
      throw new CustomError(400, errorMessage); // 400 Bad Request
    }

    try {
      const user = await UserModel.findById(idUser);
      if (!user) {
        const errorMessage = "Người dùng không tồn tại";
        throw new CustomError(404, errorMessage); // 404 Not Found
      }

      user.status = user.status === "inactive" ? "active" : "inactive";
      await user.save();

      return user;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new CustomError(500, "Lỗi cơ sở dữ liệu"); // 500 Database Error
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ"); // 500 Internal Server Error
      }
    }
  }
}

export default UserService;
