export interface University {
  originalOrderIdx: number;
  name: string;
  detailLinkPath: string;
  country: string;
  id: number;
  rank: string;
  overallScore: string;
  teachingScore: string;
  researchScore: string;
  citationsScore: string;
  industryIncomeScore: string;
  internationalOutlookScore: string;
}

export interface BeUniversity {
  name: string;
  detailLinkPath: string;
  country: string;
  id: number;
  ranks: Rank[];
  rankingScores: RankingScore[];
}


interface Rank {
  id: number;
  originalOrderIdx: number;
  year: string;
  rank: string;
}

interface RankingScore {
  id: number;
  originalOrderIdx: number;
  overallScore: string;
  teachingScore: string;
  researchScore: string;
  citationsScore: string;
  industryIncomeScore: string;
  internationalOutlookScore: string;
  year: string;
}

