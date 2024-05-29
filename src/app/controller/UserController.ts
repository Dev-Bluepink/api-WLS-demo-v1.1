import UserService from "../service/UserService";
import { Request, Response } from "express";

const userService = new UserService();

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUser();
      res.status(200).json(users);
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.status(200).json(user);
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }
  async register(req: Request, res: Response) {
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
      if (error.status && error.message) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error
      }
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.status(200).json(user);
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }
  async toggleUserStatus(req: Request, res: Response) {
    try {
      const user = await userService.toggleUserStatus(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }
}

export default new UserController();
