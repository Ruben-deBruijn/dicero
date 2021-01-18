import { gql } from '@apollo/client';

/**
 * Get an observation file by Id
 */

export const GET_OBSERVATION_FILE = gql`
    query getObservationFile($id: ID!) {
        getObservationFile (id: $id) {
            id
            shift
            observations {
                id
                description
            }
            client {
                first_name
                last_name
                birthday
            }
            user {
                name
            }
        }
    }
`;