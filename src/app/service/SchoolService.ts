import SchoolModel from "../models/School";
import CustomError from "../utils/customError";

class SchoolService {
  async toggleSchoolStatus(idSchool: string) {
    try {
      const school = await SchoolModel.findById(idSchool);
      if (!school) {
        throw new Error("Trường học không tồn tại");
      }
      school.status = school.status === "active" ? "inactive" : "active";
      return await SchoolModel.findByIdAndUpdate(idSchool, school);
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error); // 500 Internal Server Error
      }
    }
  }

  async getAllSchools(page: number, limit: number) {
    try {
      const schools = await SchoolModel.find({})
        .skip((page - 1) * limit)
        .limit(limit);
      if (!schools || schools.length === 0) {
        throw new CustomError(204, "Không tìm thấy trường học nào");
      }
      return schools;
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error); // 500 Internal Server Error
      }
    }
  }

  async getSchoolById(idSchool: string) {
    try {
      const school = await SchoolModel.findById(idSchool);
      if (!school) {
        throw new CustomError(204, "Trường học không tồn tại");
      }
      return school;
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error); // 500 Internal Server Error
      }
    }
  }

  async createSchool(school: any) {
    try {
      return await SchoolModel.create(school);
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error); // 500 Internal Server Error
      }
    }
  }

  async updateSchool(idSchool: string, school: {}) {
    console.log(school);
    try {
      return await SchoolModel.findByIdAndUpdate(idSchool, school);
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error); // 500 Internal Server Error
      }
    }
  }
  async searchSchool(
    page: number,
    limit: number,
    name?: string,
    tinh?: string,
    quan?: string,
    xa?: string,
    captruong?: string
  ) {
    try {
      const filter: any = {};

      if (name) {
        filter.name = { $regex: new RegExp(name, "i") };
      }
      if (tinh) {
        filter.tinh = { $regex: new RegExp(tinh, "i") };
      }
      if (quan) {
        filter.quan = { $regex: new RegExp(quan, "i") };
      }
      if (xa) {
        filter.xa = { $regex: new RegExp(xa, "i") };
      }
      if (captruong) {
        filter.captruong = { $regex: new RegExp(captruong, "i") };
      }

      const schools = await SchoolModel.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);
      if (schools.length === 0) {
        throw new CustomError(204, "Không tìm thấy trường học nào");
      }
      return schools;
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error);
      }
    }
  }
  async countAllSchools() {
    return await SchoolModel.countDocuments({});
  }
  async countSearchResults(
    name?: string,
    tinh?: string,
    quan?: string,
    xa?: string,
    captruong?: string
  ) {
    try {
      const filter: any = {};

      if (name) {
        filter.name = { $regex: new RegExp(name, "i") };
      }
      if (tinh) {
        filter.tinh = { $regex: new RegExp(tinh, "i") };
      }
      if (quan) {
        filter.quan = { $regex: new RegExp(quan, "i") };
      }
      if (xa) {
        filter.xa = { $regex: new RegExp(xa, "i") };
      }
      if (captruong) {
        filter.captruong = { $regex: new RegExp(captruong, "i") };
      }

      const count = await SchoolModel.countDocuments(filter);
      if (count === 0) {
        throw new CustomError(204, "Không tìm thấy trường học nào");
      }
      return count;
    } catch (error: any) {
      if (error.status && error.message) {
        throw new CustomError(error.status, error.message);
      } else {
        throw new CustomError(500, "Lỗi máy chủ nội bộ: " + error);
      }
    }
  }
}

export default new SchoolService();
