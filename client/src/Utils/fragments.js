import gql from 'graphql-tag';

export const SHOW_FRAGMENT = gql`
  fragment showFragment on Show{
    id
    name
    image
    rating
    summary
    isScheduled
    genres
    status
    premiered
    url
    gallery{
      url
    }
    comment{
      id
      body
      date
    }
    isFavorite
    seasons{
      id
      url
      number
    }
    crew{
      id
      name
      image
      type
    
    }
  }
`;
