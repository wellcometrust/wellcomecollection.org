import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UserInfo } from '../pages/hooks/useUserInfo';

export class IdentityService {
  private apiUrl = process.env.API_BASE_URL;

  private static url(endpoint: string) {
    return process.env.API_BASE_URL + endpoint;
  }

  private static config(accessToken: string): AxiosRequestConfig {
    return {
      headers: {
        'x-api-key': process.env.API_KEY,
        Authorization: 'Bearer ' + accessToken,
      },
      validateStatus: function(status) {
        return status >= 200 && status < 300;
      },
    };
  }

  static async getUserInfo(
    accessToken: string
  ): Promise<AxiosResponse<UserInfo>> {
    return axios.get(this.url('/users/me'), this.config(accessToken));
  }
}
