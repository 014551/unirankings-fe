import {BeUniversity, University} from './model/university';


const mapBeUniversity = (beUniversity: BeUniversity): University => {
  return {
    originalOrderIdx: beUniversity.ranks[0].originalOrderIdx,
    id: beUniversity.id,
    name: beUniversity.name,
    detailLinkPath: beUniversity.detailLinkPath,
    country: beUniversity.country,
    city: beUniversity.city,
    rank: beUniversity.ranks[0].rank,
    overallScore: beUniversity.rankingIndicators[0].overallScore,
    internationalStudentsRatio:
      beUniversity.rankingIndicators[0].internationalStudentsRatio,
    internationalFacultyRatio:
      beUniversity.rankingIndicators[0].internationalFacultyRatio,
    facultyStudentRatio: beUniversity.rankingIndicators[0].facultyStudentRatio,
    citationPerFaculty: beUniversity.rankingIndicators[0].citationPerFaculty,
    academicReputation: beUniversity.rankingIndicators[0].academicReputation,
    employerReputation: beUniversity.rankingIndicators[0].employerReputation,
  };
};

export const mapBeUniversities = (beUniversities: BeUniversity[]): University[] => {
  return beUniversities.map((beUniversity) => mapBeUniversity(beUniversity));
};
