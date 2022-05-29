import axios from 'axios';
import authHeader from './auth-header';
import { Job } from '../components/jobs-table/model/job';
import { API_URL } from '../model/constants';

const JOBS_API_URL = `${API_URL}/jobs`;

class JobService {
  public addNewJob = async (
    rankingIdentifier: string,
    year: string
  ): Promise<void> => {
    const data = {
      rankingIdentifier,
      year,
    };

    try {
      await axios.post(JOBS_API_URL, data, {
        headers: authHeader(),
      });
    } catch (e) {
      console.error('HTTP for adding new job failed.', e);
      return Promise.reject('HTTP for adding new job failed.');
    }
  };

  public getJobs = async (): Promise<Job[]> => {
    try {
      const response = await axios.get<Job[]>(JOBS_API_URL, {
        headers: authHeader(),
      });
      return response.data;
    } catch (e) {
      console.error('HTTP for getting jobs list failed.', e);
      return Promise.reject('HTTP for getting jobs list failed.');
    }
  };
}

export default new JobService();
