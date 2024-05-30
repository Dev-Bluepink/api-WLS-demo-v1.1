import { Request, Response } from "express";
import SchoolService from "../service/SchoolService";
import XLSX from "xlsx";

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
      const name = req.query.name as string | undefined;
      const tinh = req.query.tinh as string | undefined;
      const quan = req.query.quan as string | undefined;
      const xa = req.query.xa as string | undefined;
      const captruong = req.query.captruong as string | undefined;

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

  async uploadExcel(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const workbook = XLSX.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet) as Array<{
        Name: string;
        Address: string;
        Level: string;
        Status: string;
        Obdata: string;
        Tỉnh: string;
        Quận: string;
        Xã: string;
        "Cấp Trường": string;
        "Country ID": string;
      }>;
      console.log("Parsed data from Excel:", data);
      for (const row of data) {
        await SchoolService.createSchool({
          name: row["Name"],
          address: row["Address"],
          level: row["Level"],
          status: row["Status"],
          obdata: row["Obdata"],
          tinh: row["Tỉnh"],
          quan: row["Quận"],
          xa: row["Xã"],
          captruong: row["Cấp Trường"],
          countryid: row["Country ID"],
        });
      }
      const count = await SchoolService.countAllSchools();
      res.status(200).json({ count, message: "Data imported successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error importing data", error: error.message });
    }
  }
}

export default new SchoolController();
