import { Request, Response } from "express";
import SchoolService from "../service/SchoolService";

class SchoolController {
  async toggleSchoolStatus(req: Request, res: Response) {
    try {
      const { idSchool } = req.params;
      if (!idSchool) {
        return res.status(400).json({ message: "ID trường học là bắt buộc" });
      }
      await SchoolService.toggleSchoolStatus(idSchool);
      const school = await SchoolService.getSchoolById(idSchool);
      return res.status(200).json(school);
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }

  async getAllSchools(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const PAGE_SIZE = req.query.PAGE_SIZE
      ? parseInt(req.query.PAGE_SIZE as string)
      : 10;
    try {
      const schools = await SchoolService.getAllSchools(page, PAGE_SIZE);
      const count = schools.length;
      const totalPage = Math.ceil(count / PAGE_SIZE);
      return res.status(200).json({ count, totalPage, schools });
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }

  async getSchoolById(req: Request, res: Response) {
    try {
      const { idSchool } = req.params;
      if (!idSchool) {
        return res.status(400).json({ message: "ID trường học là bắt buộc" });
      }
      const school = await SchoolService.getSchoolById(idSchool);
      return res.status(200).json(school);
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }

  async createSchool(req: Request, res: Response) {
    try {
      const { name, address, captruong, quan, xa, tinh } = req.body;
      if (!name || !address || !captruong || !quan || !xa || !tinh) {
        return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
      }

      const school = await SchoolService.createSchool(req.body);
      return res.status(201).json(school);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Lỗi máy chủ nội bộ", error: error.message });
    }
  }

  async updateSchool(req: Request, res: Response) {
    try {
      const { idSchool } = req.params;
      if (!idSchool) {
        return res.status(400).json({ message: "ID trường học là bắt buộc" });
      }
      await SchoolService.updateSchool(idSchool, req.body);
      const school = await SchoolService.getSchoolById(idSchool);
      return res.status(200).json(school);
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }

  async searchSchool(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const PAGE_SIZE = req.query.PAGE_SIZE
      ? parseInt(req.query.PAGE_SIZE as string)
      : 10;
    try {
      const { name, tinh, quan, xa, captruong } = req.body;

      if (!name && !tinh && !quan && !xa && !captruong) {
        const schools = await SchoolService.getAllSchools(page, PAGE_SIZE);
        const count = await SchoolService.countAllSchools();
        const totalPage = Math.ceil(count / PAGE_SIZE);
        return res.status(200).json({ count, totalPage, schools });
      }

      const schools = await SchoolService.searchSchool(
        page,
        PAGE_SIZE,
        name,
        tinh,
        quan,
        xa,
        captruong
      );
      const count = await SchoolService.countSearchResults(
        name,
        tinh,
        quan,
        xa,
        captruong
      );
      const totalPage = Math.ceil(count / PAGE_SIZE);
      if (schools.length === 0) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy trường học nào" });
      }

      return res.status(200).json({ count, totalPage, schools });
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
      }
    }
  }
}

export default new SchoolController();
