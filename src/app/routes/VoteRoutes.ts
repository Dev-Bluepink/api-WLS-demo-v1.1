import VoteController from "../controller/VoteController";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /vote/add-vote:
 *   post:
 *     summary: Thêm phiếu bầu
 *     tags: [Vote]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               option:
 *                 type: object
 *                 properties:
 *                   "0": { type: boolean, example: false }
 *                   "1": { type: boolean, example: true }
 *                   "2": { type: boolean, example: false }
 *                   "3": { type: boolean, example: true }
 *               idUser:
 *                 type: string
 *                 example: "66543cfa739551a630a789c5"
 *               idSchool:
 *                 type: string
 *                 example: "6657f3e49963029c68df3770"
 *             required:
 *               - option
 *               - idUser
 *               - idSchool
 *     responses:
 *       201:
 *         description: Thêm phiếu bầu thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       204:
 *         description: Không tìm thấy tiêu chí nào đang hoạt động
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post("/add-vote", VoteController.addVote);

module.exports = router;
