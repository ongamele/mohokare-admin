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


export const CREATE_USER_NOTIFICATIONS = gql`
  mutation createUserNotification($accountNumber: String!) {
    createUserNotification(accountNumber: $accountNumber)
  }
`;

export const CREATE_USER_SMS_NOTIFICATIONS = gql`
  mutation createUserSmsNotification($accountNumber: String!) {
    createUserSmsNotification(accountNumber: $accountNumber)
  }
`;

export const CREATE_USER_EMAIL_NOTIFICATIONS = gql`
  mutation createUserEmailNotification($accountNumber: String!) {
    createUserEmailNotification(accountNumber: $accountNumber)
  }
`;


export const UPDATE_USER_DETAILS = gql`
  mutation updateUserDetails($accountNumber: String, $firstName: String, $lastName: String,$phoneNumber: String!, $email: String!) {
    updateUserDetails(accountNumber: $accountNumber, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email)
  }
`;