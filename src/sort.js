import { sortBy } from 'lodash';

export const SortCriterion = Object.freeze({
  Time: 1,
  Consensus: 2,
  Indifference: 3,
});

export default (comments, criterion) => {
  if (criterion === SortCriterion.Consensus) {
    return sortBy(comments, (comment) => {
      const allVotes = comment.voterIds.length;
      return Math.max(comment.votes.like, comment.votes.dislike) / allVotes;
    }).reverse();
  }

  if (criterion === SortCriterion.Indifference) {
    return sortBy(comments, (comment) => {
      const allVotes = comment.voterIds.length;
      return comment.votes.meh / allVotes;
    }).reverse();
  }

  if (criterion === SortCriterion.Time) {
    return sortBy(comments, (comment) => {
      return new Date(comment.created_at);
    }).reverse();
  }

  return comments;
};
