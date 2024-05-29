import { Request, Response } from "express";
import SchoolService from "../service/SchoolService";

class SchoolController {
  async toggleSchoolStatus(req: Request, res: Response) {
    try {
      const { idSchool } = req.params;
      if (!idSchool) {
        return res.status(400).json({ message: "ID trường học là bắt buộc" });
      }
      const school = await SchoolService.toggleSchoolStatus(idSchool);
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
    try {
      const schools = await SchoolService.getAllSchools();
      return res.status(200).json(schools);
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
      const { name, address } = req.body;
      if (!name || !address) {
        return res.status(400).json({ message: "Tên và địa chỉ là bắt buộc" });
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
      const school = await SchoolService.updateSchool(idSchool, req.body);
      return res.status(200).json(school);
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
