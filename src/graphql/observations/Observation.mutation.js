import { gql } from '@apollo/client';

/**
 * Create a new client
 */
export const CREATE_OBSERVATION = gql`
  mutation (
    $description: String!
    ) {
    addObservation(
      observation: {
        description: $description
      }
    ) {
        id
        description
    }
  }
`;
