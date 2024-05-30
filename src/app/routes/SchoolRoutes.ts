import { Router } from "express";
import SchoolController from "../controller/SchoolController";
import upload from "../middleware/MulterMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: School
 *     description: Các API liên quan đến trường học
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - tinh
 *         - quan
 *         - xa
 *         - captruong
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         rank:
 *           type: string
 *         vote:
 *           type: string
 *         schoolyear:
 *           type: string
 *         avatar:
 *           type: string
 *         content:
 *           type: string
 *         level:
 *           type: string
 *         phone:
 *           type: string
 *         banner:
 *           type: string
 *         email:
 *           type: string
 *         status:
 *           type: string
 *         obdata:
 *           type: string
 *         tinh:
 *           type: string
 *         quan:
 *           type: string
 *         xa:
 *           type: string
 *         captruong:
 *           type: string
 *         countryid:
 *           type: string
 */

/**
 * @swagger
 * /school/toggle-status/{idSchool}:
 *   put:
 *     summary: Cập nhật trạng thái của trường học
 *     tags: [School]
 *     parameters:
 *       - in: path
 *         name: idSchool
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của trường học
 *     responses:
 *       200:
 *         description: Trạng thái của trường học đã được cập nhật
 *       400:
 *         description: ID trường học là bắt buộc
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put("/toggle-status/:idSchool", SchoolController.toggleSchoolStatus);

/**
 * @swagger
 * /school/get-school-detail/{idSchool}:
 *   get:
 *     summary: Lấy thông tin chi tiết của trường học
 *     tags: [School]
 *     parameters:
 *       - in: path
 *         name: idSchool
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của trường học
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của trường học
 *       400:
 *         description: ID trường học là bắt buộc
 *       404:
 *         description: Trường học không tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get("/get-school-detail/:idSchool", SchoolController.getSchoolById);

/**
 * @swagger
 * /school/update-school/{idSchool}:
 *   put:
 *     summary: Cập nhật thông tin của trường học
 *     tags: [School]
 *     parameters:
 *       - in: path
 *         name: idSchool
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của trường học
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               rank:
 *                 type: string
 *               vote:
 *                 type: string
 *               schoolyear:
 *                 type: string
 *               avatar:
 *                 type: string
 *               content:
 *                 type: string
 *               address:
 *                 type: string
 *                 required: true
 *               level:
 *                 type: string
 *               phone:
 *                 type: string
 *               banner:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *               obdata:
 *                 type: string
 *               tinh:
 *                 type: string
 *                 required: true
 *               quan:
 *                 type: string
 *                 required: true
 *               xa:
 *                 type: string
 *                 required: true
 *               captruong:
 *                 type: string
 *                 required: true
 *               countryid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin trường học đã được cập nhật
 *       400:
 *         description: ID trường học là bắt buộc
 *       404:
 *         description: Trường học không tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.put("/update-school/:idSchool", SchoolController.updateSchool);

/**
 * @swagger
 * /school/get-all-schools:
 *   get:
 *     summary: Lấy danh sách tất cả các trường học
 *     tags: [School]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang hiện tại
 *       - in: query
 *         name: PAGE_SIZE
 *         schema:
 *           type: integer
 *         description: Số lượng trường học trên mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách các trường học
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 schools:
 *                   type: array
 *                 totalPage:
 *                   type: integer
 *       404:
 *         description: Không tìm thấy trường học nào
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get("/get-all-schools", SchoolController.getAllSchools);
/**
 * @swagger
 * /school/create-school:
 *   post:
 *     summary: Tạo mới một trường học
 *     tags: [School]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               address:
 *                 type: string
 *                 required: true
 *               rank:
 *                 type: string
 *               vote:
 *                 type: string
 *               schoolyear:
 *                 type: string
 *               avatar:
 *                 type: string
 *               content:
 *                 type: string
 *               level:
 *                 type: string
 *               phone:
 *                 type: string
 *               banner:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *               obdata:
 *                 type: string
 *               tinh:
 *                 type: string
 *                 required: true
 *               quan:
 *                 type: string
 *                 required: true
 *               xa:
 *                 type: string
 *                 required: true
 *               captruong:
 *                 type: string
 *                 required: true
 *               countryid:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trường học đã được tạo
 *       400:
 *         description: Tên và địa chỉ là bắt buộc
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.post("/create-school", SchoolController.createSchool);

/**
 * @swagger
 * /upload-excel:
 *   post:
 *     summary: Tải lên tệp Excel
 *     tags: [School]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dữ liệu đã được nhập thành công
 *       400:
 *         description: Không có tệp nào được tải lên
 *       500:
 *         description: Lỗi khi nhập dữ liệu
 */
router.post(
  "/upload-excel",
  upload.single("file"),
  SchoolController.uploadExcel
);

/**
 * @swagger
 * /school/search-school:
 *   get:
 *     summary: Tìm kiếm trường học
 *     tags: [School]
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
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tên trường học
 *       - in: query
 *         name: tinh
 *         schema:
 *           type: string
 *         description: Tỉnh
 *       - in: query
 *         name: quan
 *         schema:
 *           type: string
 *         description: Quận
 *       - in: query
 *         name: xa
 *         schema:
 *           type: string
 *         description: Xã
 *       - in: query
 *         name: captruong
 *         schema:
 *           type: string
 *         description: Cấp trường
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 totalPage:
 *                   type: integer
 *                 schools:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/School'
 *       404:
 *         description: Không tìm thấy trường học nào
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get("/search-school", SchoolController.searchSchool);

module.exports = router;
