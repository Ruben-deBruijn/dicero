import { gql } from '@apollo/client';

/**
 * Retrieve all Shop Items
 */
export const GET_CLIENTS = gql`
  query {
      getClients {
        id
        first_name
        last_name
        birthday
        contact_person
  }
}
`;

export const GET_CLIENT_FORM_VALUES = gql`
  query {
      getClients {
        id
        first_name
        last_name
  }
}
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
      getClient (id: $id) {
        id
        first_name
        last_name
        birthday
        contact_person
  }
}
`;