import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { UserInfo } from '../hooks/useUserInfo';
import { IdentityService } from '../../util/IdentityService';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { accessToken } = await getAccessToken(req, res);
  if (accessToken) {
    const { data } = await IdentityService.getUserInfo(accessToken);
    res.status(200).send(data as UserInfo);
  }
  res.status(401);
}
