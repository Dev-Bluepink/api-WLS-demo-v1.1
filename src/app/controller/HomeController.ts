import { Request, Response } from "express";

class HomeController {
  home(req: Request, res: Response) {
    // console.log("đã tới trang home");
    res.status(200).send("Đây là trang homeeeeeeeeeeee");
  }
}

module.exports = new HomeController();
