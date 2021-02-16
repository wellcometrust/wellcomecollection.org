import axios, { AxiosResponse } from 'axios';
import { UserInfo } from '../pages/hooks/useUserInfo';

export class IdentityService {
  private apiUrl = process.env.API_BASE_URL;

  private static getHeaders(accessToken: string) {
    return {
      headers: {
        'x-api-key': process.env.API_KEY,
        Authorization: 'Bearer ' + accessToken,
      },
    };
  }

  static async getUserInfo(
    accessToken: string
  ): Promise<AxiosResponse<UserInfo>> {
    return axios.get(
      process.env.API_BASE_URL + '/users/me',
      this.getHeaders(accessToken)
    );
  }
}
