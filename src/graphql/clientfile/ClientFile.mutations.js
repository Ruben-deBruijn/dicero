import { gql } from '@apollo/client';

/**
 * Create a new client file
 */
export const CREATE_CLIENT_FILE = gql`
  mutation (
    $shift: String!
    $observations: [ID]
    $client: ID!
    $user: ID!
    ) {
    addClientFile(
      clientFile: {
        shift: $shift
        observations: $observations
        user: $user
        client: $client
      }
    ) {
        id
    }
  }
`;