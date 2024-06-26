/**
 * @swagger
 * tags:
 *   name: User
 *   description: Quản lý người dùng
 */
import userController from "../controller/UserController";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - status
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         status:
 *           type: string
 *         googleId:
 *           type: string
 *         fullname:
 *           type: string
 *         role:
 *           type: string
 *         avatar:
 *           type: string
 */

/**
 * @swagger
 * /user/get-detail-user/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của người dùng
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của người dùng
 *       404:
 *         description: Người dùng không tồn tại
 */
router.get("/get-detail-user/:id", userController.getUser);

/**
 * @swagger
 * /user/toggle-user-status/{id}:
 *   put:
 *     summary: Cập nhật trạng thái người dùng
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Người dùng đã bị xóa
 *       404:
 *         description: Người dùng không tồn tại
 */
router.put("/toggle-user-status/:id", userController.toggleUserStatus);

/**
 * @swagger
 * /user/update-user/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *               role:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật
 *       404:
 *         description: Người dùng không tồn tại
 */
router.put("/update-user/:id", userController.updateUser);

/**
 * @swagger
 * /user/get-all-user:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang
 *       - in: query
 *         name: PAGE_SIZE
 *         schema:
 *           type: integer
 *         description: Kích thước trang
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *       404:
 *         description: Không tìm thấy người dùng nào
 */
router.get("/get-all-user", userController.getAllUsers);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Người dùng đã được đăng ký
 *       400:
 *         description: Thiếu thông tin đăng ký
 *       409:
 *         description: Username hoặc email đã tồn tại
 */
router.post("/register", userController.register);

module.exports = router;
