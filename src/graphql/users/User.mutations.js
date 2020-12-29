import { gql } from '@apollo/client';

/**
 * Create a new user
 */
export const CREATE_USER = gql`
  mutation (
    $name: String!
    $email: String!
    $address: String!
    $city: String!
    $postal_code: String!
    $job_title: String!
    ) {
    addUser(
      user: {
        name: $name
        email: $email
        address: $address
        city: $city
        postal_code: $postal_code
        job_title: $job_title
      }
    ) {
        name
        email
        address
        city
        postal_code
        job_title
  }
  }
`;


export const UPDATE_USER = gql`
  mutation (
    $id: ID!
    $name: String!
    $email: String!
    $address: String!
    $city: String!
    $postal_code: String!
    $job_title: String!
    ) {
    updateUser(
      id: $id
      user: {
        name: $name
        email: $email
        address: $address
        city: $city
        postal_code: $postal_code
        job_title: $job_title
      }
    ) {
      id
  }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
      deleteUser(id: $id) {
        id
    }
  }
`;
