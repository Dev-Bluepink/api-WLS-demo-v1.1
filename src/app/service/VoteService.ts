import Vote, { IVote } from "../models/Vote";
import UserService from "./UserService";
import CriteriaService from "./CriteriaService";

class VoteService {
  async addVote(vote: IVote) {
    const checkDate = await CriteriaService.getCriteria(
      vote.criteria.toString()
    );
    if (checkDate?.status === "Inactive") {
      return false;
    }
    const checkVoted = await Vote.findOne({
      user: vote.user,
      school: vote.school,
      criteria: vote.criteria,
    });
    if (checkVoted) {
      if (checkVoted?.isDelete === true) {
        return false;
      } else {
        checkVoted.isDelete = false;
        await checkVoted.save();
        return checkVoted;
      }
    }
    return await Vote.create(vote);
  }

  async getVote(vote: IVote) {
    return await Vote.findOne({
      user: vote.user,
      school: vote.school,
      criteria: vote.criteria,
    });
  }

  async getAllVotes() {
    return await Vote.find();
  }

  async updateVote(voteId: string, vote: IVote) {
    return await Vote.findByIdAndUpdate(voteId, vote);
  }

  async deleteVote(vote: IVote) {
    return await Vote.findOneAndUpdate(
      { user: vote.user, school: vote.school, criteria: vote.criteria },
      { isDelete: true }
    );
  }
  async changeVote(vote: IVote) {
    return await Vote.findOneAndUpdate(
      { user: vote.user, school: vote.school, criteria: vote.criteria },
      { isDelete: false }
    );
  }
}

export default new VoteService();
