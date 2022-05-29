import { BeUniversity, University } from './model/university';

const mapBeUniversity = (beUniversity: BeUniversity): University => {
  return {
    originalOrderIdx: beUniversity.ranks[0].originalOrderIdx,
    id: beUniversity.id,
    name: beUniversity.name,
    detailLinkPath: beUniversity.detailLinkPath,
    country: beUniversity.country,
    rank: beUniversity.ranks[0].rank,
    overallScore: beUniversity.rankingScores[0].overallScore,
    teachingScore: beUniversity.rankingScores[0].teachingScore,
    researchScore: beUniversity.rankingScores[0].researchScore,
    citationsScore: beUniversity.rankingScores[0].citationsScore,
    industryIncomeScore: beUniversity.rankingScores[0].industryIncomeScore,
    internationalOutlookScore:
      beUniversity.rankingScores[0].internationalOutlookScore,
  };
};

export const mapBeUniversities = (
  beUniversities: BeUniversity[]
): University[] => {
  return beUniversities.map((beUniversity) => mapBeUniversity(beUniversity));
};
