import Criteria, { ICriteria } from "../models/Criteria";
import { IVote } from "../models/Vote";
import mongoose from "mongoose";
import CustomError from "../utils/customError";
import getErrorMessage from "../utils/getMessageError";

class CriteriaService {
  async addCriteria(criteria: ICriteria) {
    if (!criteria.description) {
      throw new CustomError(400, "Mô tả là bắt buộc.");
    }
    try {
      return await Criteria.create(criteria);
    } catch (error: any) {
      const messageError = getErrorMessage(error);
      throw new CustomError(500, `Lỗi khi tạo tiêu chí mới: ${messageError}`);
    }
  }

  async getCriteria(criteriaId: string) {
    try {
      return await Criteria.findById(criteriaId);
    } catch (error: any) {
      const messageError = getErrorMessage(error);
      throw new CustomError(500, `Lỗi khi lấy tiêu chí: ${messageError}`);
    }
  }

  async getAllCriteria() {
    try {
      return await Criteria.find({ status: "Active" }).sort({ createdAt: -1 });
    } catch (error: any) {
      const messageError = getErrorMessage(error);
      throw new CustomError(
        500,
        `Lỗi khi lấy tất cả tiêu chí: ${messageError}`
      );
    }
  }
  async getAllCriteriaActive() {
    try {
      return await Criteria.find({ status: "Active" }).sort({ createdAt: -1 });
    } catch (error: any) {
      const messageError = getErrorMessage(error);
      throw new CustomError(
        500,
        `Lỗi khi lấy tất cả tiêu chí: ${messageError}`
      );
    }
  }

  async updateCriteria(criteriaId: string, criteria: ICriteria) {
    try {
      return await Criteria.findByIdAndUpdate(criteriaId, criteria);
    } catch (error: any) {
      const messageError = getErrorMessage(error);
      throw new CustomError(500, `Lỗi khi cập nhật tiêu chí: ${messageError}`);
    }
  }

  async getAllCriteriaToVote(school: string, user: string) {
    try {
      const listCriteria = await Criteria.aggregate([
        { $match: { status: "Active" } },
        {
          $lookup: {
            from: "votes", // Tên collection chứa thông tin bỏ phiếu
            let: { criteria: "$_id", school: school, user: user }, // Sử dụng cả criteria và school
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$criteria", "$$criteria"] },
                      { $eq: ["$school", new mongoose.Types.ObjectId(school)] }, // Thêm điều kiện so sánh school
                      { $eq: ["$user", new mongoose.Types.ObjectId(user)] },
                      { $eq: ["$status", "Active"] }, // Thêm điều kiện status phải bằng Active
                    ],
                  },
                },
              },
              { $project: { _id: 1 } }, // Chỉ lấy _id để kiểm tra sự tồn tại
            ],
            as: "userVotes",
          },
        },
        {
          $addFields: {
            votedByUser: {
              $cond: {
                if: { $gt: [{ $size: "$userVotes" }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);
      return listCriteria;
    } catch (error) {
      const messageError = getErrorMessage(error);
      throw new CustomError(
        500,
        `Lỗi khi lấy tất cả tiêu chí: ${messageError}`
      );
    }
  }
  async deleteCriteria(criteriaId: string) {
    try {
      return await Criteria.findByIdAndUpdate(criteriaId, {
        status: "Inactive",
      });
    } catch (error) {
      const messageError = getErrorMessage(error);
      throw new CustomError(500, `Lỗi khi xoá tiêu chí: ${messageError}`);
    }
  }
  async getCriteriaById(criteriaId: string) {
    try {
      const criteria = await Criteria.findById(criteriaId);
      if (!criteria) {
        throw new CustomError(204, "Tiêu chí không tồn tại.");
      }
      return criteria;
    } catch (error) {
      const messageError = getErrorMessage(error);
      throw new CustomError(500, `Lỗi khi lấy tiêu chí: ${messageError}`);
    }
  }
}

export default new CriteriaService();
