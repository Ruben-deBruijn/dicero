import { gql } from '@apollo/client';

/**
 * Create a new client
 */
export const CREATE_OBSERVATION = gql`
  mutation (
    $description: String!
    $client: ID!
    $user: ID!
    ) {
    addObservation(
      observation: {
        description: $description
        client: $client
        user: $user
      }
    ) {
        description
        client
        user
    }
  }
`;
