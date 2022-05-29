import axios from 'axios';
import { User } from '../model/user';
import { API_URL } from '../model/constants';

const AUTH_API_URL = `${API_URL}/api/auth`;

class AuthService {
  async login(username: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${AUTH_API_URL}/signin`, {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (e) {
      return Promise.reject('HTTP to sing in user failed.');
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<string> {
    try {
      return await axios.post(`${AUTH_API_URL}/signup`, {
        username,
        email,
        password,
      });
    } catch (e) {
      return Promise.reject('HTTP to sing up user failed.');
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

export default new AuthService();
