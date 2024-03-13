import React from 'react';

import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire St Building',
    description:
      'Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNAG7iptYkmXdRODIfH30UToKMxcwIycF8ou5RI=w408-h292-k-no',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u1',
  },
  {
    id: 'p1',
    title: 'Empire St Building',
    description:
      'Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNAG7iptYkmXdRODIfH30UToKMxcwIycF8ou5RI=w408-h292-k-no',
    address: '20 W 34th St., New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: 'u2',
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
