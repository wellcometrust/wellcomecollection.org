import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { UserInfo } from '../hooks/useUserInfo';
import { IdentityService } from '../../util/IdentityService';

async function withValidation(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  const { accessToken } = await getAccessToken(req, res);
  if (accessToken) {
    try {
      await IdentityService.validate(accessToken, req.body.password);
      return next(req, res);
    } catch (err) {
      return res.status(401).end();
    }
  }
}

async function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await getAccessToken(req, res);
  if (accessToken) {
    const { data } = await IdentityService.getUserInfo(accessToken);
    return res.status(200).send(data as UserInfo);
  }
  return res.status(401).end();
}

async function updateUserInfo(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await getAccessToken(req, res);
  if (accessToken) {
    const { password, ...newUserInfo } = req.body;
    const {
      status: updateUserInfoStatus,
    } = await IdentityService.updateUserInfo(accessToken, newUserInfo);
    return res.status(updateUserInfoStatus).end();
  }
}

export default async function(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case 'GET': {
      return getUserInfo(req, res);
    }
    case 'PUT': {
      return withValidation(req, res, updateUserInfo);
    }
    default: {
      res.status(404);
    }
  }
}
