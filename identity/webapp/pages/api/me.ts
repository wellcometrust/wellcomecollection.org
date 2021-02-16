import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { UserInfo } from '../hooks/useUserInfo';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { accessToken } = await getAccessToken(req, res);
  const { data } = await axios.get(process.env.API_BASE_URL + '/users/me', {
    headers: {
      'x-api-key': process.env.API_KEY,
      Authorization: 'Bearer ' + accessToken,
    },
  });
  res.status(200).send(data as UserInfo);
}
