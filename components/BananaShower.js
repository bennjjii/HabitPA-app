import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Text} from 'react-native';

const GET_BANANA = gql`
  query GetBanana {
    banana
  }
`;

const BananaShower = () => {
  const {loading, error, data} = useQuery(GET_BANANA);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;
  {
    data?.banana;
  }
  return <Text>PooPoo</Text>;
};

export default BananaShower;
