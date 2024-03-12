import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS_MOCKED_DATA = [
    {
      id: 'u1',
      name: 'Sofia Uza',
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      places: 3,
    },
  ];
  return <UsersList items={USERS_MOCKED_DATA} />;
};

export default Users;
