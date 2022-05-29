export interface Job {
  id: number;
  rankingIdentifier: RankingIdentifier;
  rankingYear: string;
  processingDate: string;
  result: JobResult;
  processingType: JobProcessingType;
  error: string;
}

enum RankingIdentifier {
  QS_WORLD_UNIVERSITY_RANKINGS = 'QS_WORLD_UNIVERSITY_RANKINGS',
  TIMES_HIGHER_EDUCATION = 'TIMES_HIGHER_EDUCATION',
}

enum JobResult {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

enum JobProcessingType {
  FULL = 'FULL',
  CACHE = 'CACHE',
}
