import axios, { AxiosError } from 'axios';
import { UserInfo } from './useUserInfo';

type Mutation = (
  body: Partial<UserInfo> & { password: string },
  onSuccess: () => void,
  onFailure: (statusCode?: number) => void
) => void;

export function useUpdateUserInfo(): [Mutation] {
  const mutate: Mutation = async (body, onSuccess, onFailure) => {
    await axios
      .put('/api/me', body)
      .then(onSuccess)
      .catch((error: AxiosError) => {
        onFailure(error.response?.status);
      });
  };

  return [mutate];
}
