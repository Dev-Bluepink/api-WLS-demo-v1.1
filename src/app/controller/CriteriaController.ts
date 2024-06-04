import CriteriaService from "../service/CriteriaService";
import { Request, Response } from "express";
import getErrorMessage from "../utils/getMessageError";

class CriteriaController {
  async getAllCriteriaToVote(req: Request, res: Response) {
    const { idUser, idSchool } = req.query;
    const listCriteria = await CriteriaService.getAllCriteriaToVote(
      idSchool as string,
      idUser as string
    );
    return res.status(200).json(listCriteria);
  }
  async addCriteria(req: Request, res: Response) {
    if (!req.body.description) {
      return res.status(400).json({ message: "Mô tả là bắt buộc." });
    }
    const input: { description: string } = {
      description: req.body.description,
    };
    try {
      const criteria = await CriteriaService.addCriteria(input);
      res.status(201).send(criteria);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Lỗi khi thêm tiêu chí mới.", error: error.message });
    }
  }
  async getAllCriteria(req: Request, res: Response) {
    try {
      const listCriteria = await CriteriaService.getAllCriteria();
      return res.status(200).json(listCriteria);
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        const messageError = getErrorMessage(error);
        return res.status(500).json({ message: messageError });
      }
    }
  }
  async deleteCriteria(req: Request, res: Response) {
    const { idCriteria } = req.params;
    if (!idCriteria) {
      return res.status(400).json({ message: "Thiếu ID tiêu chí." });
    }
    try {
      const result = await CriteriaService.deleteCriteria(idCriteria);
      if (!result) {
        return res
          .status(204)
          .json({ message: "Tiêu chí không tồn tại hoặc đã bị xoá trước đó." });
      }
      return res.status(200).json({ message: "Xoá tiêu chí thành công." });
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        const messageError = getErrorMessage(error);
        return res.status(500).json({ message: messageError });
      }
    }
  }
  async getCriteriaById(req: Request, res: Response) {
    const { idCriteria } = req.params;
    if (!idCriteria) {
      return res.status(400).json({ message: "Thiếu ID tiêu chí." });
    }
    try {
      const criteria = await CriteriaService.getCriteriaById(idCriteria);
      return res.status(200).json(criteria);
    } catch (error: any) {
      if (error.status && error.message) {
        return res.status(error.status).json({ message: error.message });
      } else {
        const messageError = getErrorMessage(error);
        return res.status(500).json({ message: messageError });
      }
    }
  }
}

export default new CriteriaController();
