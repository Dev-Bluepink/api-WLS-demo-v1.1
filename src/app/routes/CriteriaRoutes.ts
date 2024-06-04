import CriteriaController from "../controller/CriteriaController";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Criteria:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         description:
 *           type: string
 *           description: Mô tả của tiêu chí
 *         status:
 *           type: string
 *           description: Trạng thái của tiêu chí (Active hoặc Inactive)
 *           enum:
 *             - Active
 *             - Inactive
 *       example:
 *         description: "Tiêu chí về môi trường"
 *         status: "Active"
 * /criteria/get-criteria/{idCriteria}:
 *   get:
 *     summary: Lấy thông tin tiêu chí theo ID
 *     tags: [Criteria]
 *     parameters:
 *       - in: path
 *         name: idCriteria
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của tiêu chí
 *     responses:
 *       200:
 *         description: Thông tin tiêu chí
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Criteria'
 *       400:
 *         description: Thiếu ID tiêu chí
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get("/get-criteria/:idCriteria", CriteriaController.getCriteriaById);

/**
 * @swagger
 * /criteria/get-all-criteria:
 *   get:
 *     summary: Lấy danh sách tất cả các tiêu chí
 *     tags: [Criteria]
 *     responses:
 *       200:
 *         description: Danh sách tất cả các tiêu chí
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Criteria'
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get("/get-all-criteria", CriteriaController.getAllCriteria);
/**
 * @swagger
 * /criteria/add-criteria:
 *   post:
 *     summary: Thêm tiêu chí mới
 *     tags: [Criteria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Tiêu chí về môi trường"
 *     responses:
 *       201:
 *         description: Tiêu chí đã được thêm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post("/add-criteria", CriteriaController.addCriteria);
/**
 * @swagger
 * /criteria/get-all-criteria-to-vote:
 *   get:
 *     summary: Lấy danh sách các tiêu chí để bỏ phiếu
 *     tags: [Criteria]
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người dùng
 *       - in: query
 *         name: idSchool
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của trường học
 *     responses:
 *       200:
 *         description: Danh sách các tiêu chí để bỏ phiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Criteria'
 *       400:
 *         description: Thiếu thông tin cần thiết
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get(
  "/get-all-criteria-to-vote",
  CriteriaController.getAllCriteriaToVote
);
/**
 * @swagger
 * /criteria/delete-criteria/{idCriteria}:
 *   delete:
 *     summary: Xoá tiêu chí dựa trên ID
 *     tags: [Criteria]
 *     parameters:
 *       - in: path
 *         name: idCriteria
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của tiêu chí cần xoá
 *     responses:
 *       200:
 *         description: Xoá tiêu chí thành công
 *       204:
 *         description: Tiêu chí không tồn tại hoặc đã bị xoá trước đó
 *       400:
 *         description: Thiếu ID tiêu chí
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.delete(
  "/delete-criteria/:idCriteria",
  CriteriaController.deleteCriteria
);

module.exports = router;
