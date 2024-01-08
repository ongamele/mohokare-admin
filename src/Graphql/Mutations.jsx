import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      id
      name
      surname
      phoneNumber
      email
      token
      createdAt
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation createAdmin(
    $name: String!
    $surname: String!
    $phoneNumber: Int!
    $email: String!
    $password: String!
  ) {
    createAdmin(
      adminInput: {
        name: $name
        surname: $surname
        phoneNumber: $phoneNumber
        email: $email
        password: $password
      }
    ) {
      id
      name
      surname
      phoneNumber
      email
      token
      createdAt
    }
  }
`;
