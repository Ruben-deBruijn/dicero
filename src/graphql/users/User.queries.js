import { gql } from '@apollo/client';

/**
 * Retrieve all users
 */
export const GET_USERS = gql`
  query {
      getUsers {
        id
        name
        email
        address
        city
        postal_code
        job_title
  }
}
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
      getUser (id: $id) {
        id
        name
        email
        address
        city
        postal_code
        job_title
  }
}
`;