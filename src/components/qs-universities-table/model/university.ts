export interface University {
  originalOrderIdx: number;
  name: string;
  detailLinkPath: string;
  country: string;
  city: string;
  id: number;
  rank: string;
  overallScore: string;
  internationalStudentsRatio: string;
  internationalFacultyRatio: string;
  facultyStudentRatio: string;
  citationPerFaculty: string;
  academicReputation: string;
  employerReputation: string;
}

interface Rank {
  id: number;
  originalOrderIdx: number;
  year: string;
  rank: string;
}

interface RankingIndicator {
  id: number;
  originalOrderIdx: number;
  overallScore: string;
  internationalStudentsRatio: string;
  internationalFacultyRatio: string;
  facultyStudentRatio: string;
  citationPerFaculty: string;
  academicReputation: string;
  employerReputation: string;
  year: string;
}

export interface BeUniversity {
  name: string;
  detailLinkPath: string;
  country: string;
  city: string;
  id: number;
  ranks: Rank[];
  rankingIndicators: RankingIndicator[];
}
