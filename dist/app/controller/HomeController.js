"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HomeController = /** @class */ (function () {
    function HomeController() {
    }
    HomeController.prototype.home = function (req, res) {
        // console.log("đã tới trang home");
        res.status(200).send("Đây là trang homeeeeeeeeeeee");
    };
    return HomeController;
}());
module.exports = new HomeController();
