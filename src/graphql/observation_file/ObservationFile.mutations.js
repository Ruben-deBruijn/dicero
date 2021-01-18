import { gql } from '@apollo/client';

/**
 * Create a new observation file
 */
export const CREATE_OBSERVATION_FILE = gql`
  mutation (
    $shift: String!
    $observations: [ID]
    $client: ID!
    $user: ID!
    ) {
    addObservationFile(
      observationFile: {
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

export const UPDATE_OBSERVATION_FILE = gql`
  mutation (
    $id: ID!
    $observations: [ID]
    ) {
    updateObservationFile(
      id: $id
      observationFile: {
        observations: $observations
      }
    ) {
        id
        observations {
          id
          description
        }
    }
  }
`;