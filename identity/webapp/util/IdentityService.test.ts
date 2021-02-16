import axios from 'axios';
import { UserInfo } from '../pages/hooks/useUserInfo';
import { IdentityService } from './IdentityService';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
process.env.API_BASE_URL = 'https://example.com/api';
process.env.API_KEY = 'SUPER_SECRET_KEY';

describe('IdentityService', () => {
  it('gets the current user info', async () => {
    const mockResponse = {
      status: 200,
      data: {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'iamironman@starkindustries.com',
        barcode: '1234567',
      } as UserInfo,
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    expect(await IdentityService.getUserInfo('ACCESS_TOKEN')).toEqual(
      mockResponse
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://example.com/api/users/me',
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer ACCESS_TOKEN',
          'x-api-key': 'SUPER_SECRET_KEY',
        },
      })
    );
  });
});
