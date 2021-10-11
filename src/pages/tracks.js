import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TrackCard from '../containers/track-card';
import { Layout, QueryResult } from '../components';

// const user = "pah799";

/** TRACKS gql query to retreive all tracks */
export const TRACKS = gql`
  query Query {
  user(slug:"pah799") {
    cards {
      id
      name
      rarity
      pictureUrl
      player {
        age
        status {
          playingStatus
          lastFiveSo5AverageScore
          lastFifteenSo5AverageScore
        }
      }
      userOwnerWithRate{
        priceInFiat{
          usd
        }
      }
    }
  }
}
`;

/**
 * Tracks Page is the home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
          {data?.user.cards?.map((track, index) => 
            (<TrackCard key={track.id} track = {track} /> )
          )};
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
