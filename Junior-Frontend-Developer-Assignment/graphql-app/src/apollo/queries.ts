import { gql } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      name
      capital
      
    }
  }
`;