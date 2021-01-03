import { gql } from '@apollo/client';

/**
 * Retrieve all Shop Items
 */
export const GET_CLIENTS = gql`
  query {
      getClients {
        id
        name
        email
        address
        city
        postal_code
  }
}
`;

export const GET_CLIENT_FORM_VALUES = gql`
  query {
      getClients {
        id
        name
  }
}
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
      getClient (id: $id) {
        id
        name
        email
        address
        city
        postal_code
  }
}
`;