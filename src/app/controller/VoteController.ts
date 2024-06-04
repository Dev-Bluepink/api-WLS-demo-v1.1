import { Request, Response } from "express";
import { IVote } from "../models/Vote";
import VoteService from "../service/VoteService";
import CriteriaService from "../service/CriteriaService";
import mongoose from "mongoose";

class VoteController {
  async addVote(req: Request, res: Response) {
    const {
      option,
      idUser,
      idSchool,
    }: {
      option: { [key: number]: boolean };
      idUser: string;
      idSchool: string;
    } = req.body;

    if (!option || !idUser || !idSchool) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết." });
    }

    const listCriteria = await CriteriaService.getAllCriteriaActive();
    if (listCriteria.length === 0) {
      return res
        .status(204)
        .json({ message: "Không tìm thấy tiêu chí nào đang hoạt động." });
    }

    let votesAdded = 0;
    let votesDeleted = 0;
    for (const [index, isVote] of Object.entries(option)) {
      const criteria = listCriteria[parseInt(index)];
      if (!criteria) {
        continue; // Bỏ qua nếu không tìm thấy tiêu chí tương ứng
      }
      const vote: IVote = {
        user: new mongoose.Types.ObjectId(idUser),
        school: new mongoose.Types.ObjectId(idSchool),
        criteria: criteria._id,
      };
      const checkVote = await VoteService.getVote(vote);

      if (isVote) {
        if (checkVote) {
          if (checkVote.isDelete === true) {
            const result = await VoteService.changeVote(vote);
            if (result) {
              votesAdded++;
            }
          } else {
            continue; // Bỏ qua nếu phiếu bầu đã tồn tại và chưa bị xóa
          }
        } else {
          const result = await VoteService.addVote(vote);
          if (result) {
            votesAdded++;
          }
        }
      } else {
        if (checkVote && checkVote.isDelete === false) {
          const result = await VoteService.deleteVote(vote);
          if (result) {
            votesDeleted++;
          }
        }
      }
    }

    if (votesAdded === 0 && votesDeleted === 0) {
      return res.status(400).json({
        message:
          "Không thể thực hiện thao tác. Có thể các tiêu chí đã bị vô hiệu hoá hoặc đã bầu.",
      });
    }

    return res.status(201).json({
      message: `Đã thêm thành công ${votesAdded} phiếu bầu và xóa ${votesDeleted} phiếu bầu.`,
    });
  }
}

export default new VoteController();
