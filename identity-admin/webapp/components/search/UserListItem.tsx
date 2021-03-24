import React from 'react';
import { User } from '../../interfaces';
import { prettyDate } from '../../utils/prettyDate';

type Props = {
  data: User;
};

const UserListItem = ({ data }: Props): JSX.Element => {
  const userPageUrl = '/user/' + data.userId;
  const redirectToUser = () => {
    window.location.href = userPageUrl;
  };

  return (
    <tr className="user-list__item" onClick={redirectToUser}>
      <td className="user-list__first">
        {data.firstName} {data.lastName}
      </td>
      <td>{data.email}</td>
      <td>{data.userId}</td>
      <td>{statusMessage(data)}</td>
      <td>{data.lastLoginDate && prettyDate(data.lastLoginDate)}</td>
    </tr>
  );
};

function statusMessage(user: User): string {
  if (user.deleteRequested) {
    return 'Pending Delete';
  }
  if (user.locked) {
    return 'Blocked';
  }
  return 'Active';
}

export default UserListItem;
