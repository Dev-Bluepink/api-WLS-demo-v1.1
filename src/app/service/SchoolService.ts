import { Request, Response } from "express";
import SchoolModel from "../models/School";
import { ISchool } from "../models/School";
import CustomError from "../utils/customError";
import mongoose from "mongoose";

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
      throw new CustomError(500, error.message);
    }
  }

  async getAllSchools() {
    try {
      const schools = await SchoolModel.find({});
      if (!schools || schools.length === 0) {
        throw new CustomError(404, "Không tìm thấy trường học nào");
      }
      return schools;
    } catch (error: any) {
      if (error instanceof mongoose.Error) {
        throw new CustomError(500, "Lỗi cơ sở dữ liệu");
      } else {
        throw new CustomError(500, error.message);
      }
    }
  }

  async getSchoolById(idSchool: string) {
    try {
      const school = await SchoolModel.findById(idSchool);
      if (!school) {
        throw new CustomError(404, "Trường học không tồn tại");
      }
      return school;
    } catch (error: any) {
      if (error instanceof mongoose.Error) {
        throw new CustomError(500, "Lỗi cơ sở dữ liệu");
      } else {
        throw new CustomError(500, error.message);
      }
    }
  }

  async createSchool(school: {}) {
    try {
      return await SchoolModel.create(school);
    } catch (error: any) {
      if (error instanceof mongoose.Error) {
        throw new CustomError(500, "Lỗi cơ sở dữ liệu");
      } else {
        throw new CustomError(500, error.message);
      }
    }
  }

  async updateSchool(idSchool: string, school: {}) {
    try {
      return await SchoolModel.findByIdAndUpdate(idSchool, school);
    } catch (error: any) {
      if (error instanceof mongoose.Error) {
        throw new CustomError(500, "Lỗi cơ sở dữ liệu");
      } else {
        throw new CustomError(500, error.message);
      }
    }
  }
}

export default new SchoolService();
