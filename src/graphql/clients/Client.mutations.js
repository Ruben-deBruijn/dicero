import { gql } from '@apollo/client';

/**
 * Create a new client
 */
export const CREATE_CLIENT = gql`
  mutation (
    $name: String!
    $email: String!
    $address: String!
    $city: String!
    $postal_code: String!
    ) {
    addClient(
      client: {
        name: $name
        email: $email
        address: $address
        city: $city
        postal_code: $postal_code
      }
    ) {
        name
        email
        address
        city
        postal_code
  }
  }
`;


export const UPDATE_CLIENT = gql`
  mutation (
    $id: ID!
    $name: String!
    $email: String!
    $address: String!
    $city: String!
    $postal_code: String!
    ) {
    updateClient(
      id: $id
      client: {
        name: $name
        email: $email
        address: $address
        city: $city
        postal_code: $postal_code
      }
    ) {
      id
  }
  }
`;

export const DELETE_CLIENT = gql`
  mutation ($id: ID!) {
      deleteClient(id: $id) {
        id
    }
  }
`;
