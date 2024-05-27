import { Request, Response } from "express";
import UserService from "../service/UserService";
import { tokenSign } from "../utils/token";

const userService = new UserService();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Thiếu thông tin đăng nhập");
  }

  try {
    const isValidUser = await userService.validateUser(username, password);
    if (!isValidUser) {
      return res.status(400).send("Username hoặc password không hợp lệ");
    }

    const user = await userService.findUserByUsername(username);
    if (!user) {
      return res.status(404).send("User không tồn tại");
    }

    const token = tokenSign(user._id.toString());
    res.status(200).send({ message: "Đăng nhập thành công", user, token });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const register = async (req: Request, res: Response) => {
  console.log("đã tới trang đăng ký");

  if (!req.body) {
    return res.status(400).send("Thiếu thông tin đăng ký");
  }

  const { email, password } = req.body;
  const username = req.body.username;
  console.log(username, email, password);

  if (!username || !email || !password) {
    return res.status(400).send("Thiếu thông tin đăng ký");
  }

  try {
    await userService.addUser(username, email, password);
    res.status(201).send("Người dùng đã được đăng ký");
  } catch (error: any) {
    if (error.message === "Username hoặc email đã tồn tại") {
      return res.status(409).send(error.message);
    }
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};
