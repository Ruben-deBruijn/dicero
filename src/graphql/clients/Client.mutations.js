import { gql } from '@apollo/client';

/**
 * Create a new client
 */
export const CREATE_CLIENT = gql`
  mutation (
    $first_name: String!
    $last_name: String!
    $birthday: String!
    $contact_person: String!
    ) {
    addClient(
      client: {
        first_name: $first_name
        last_name: $last_name
        birthday: $birthday
        contact_person: $contact_person
      }
    ) {
        first_name
        last_name
        birthday
        contact_person
    }
  }
`;


export const UPDATE_CLIENT = gql`
  mutation (
    $id: ID!
    $first_name: String!
    $last_name: String!
    $birthday: String!
    $contact_person: String!
    ) {
    updateClient(
      id: $id
      client: {
        first_name: $first_name
        last_name: $last_name
        birthday: $birthday
        contact_person: $contact_person
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
