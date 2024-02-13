import { gql } from "@apollo/client";



export const GET_STATEMENT= gql`
  query getStatement($accountNumber: String!) {
    getStatement(accountNumber: $accountNumber) {
      accountNumber
      consumerName
      firstName
    lastName
      phoneNumber
      email
      province
      idNumber
      indigentExpiry
      date
      isIndigent
      indigentApplicationDate
      town
      suburb
      ward
      street
      postalAddress1
      postalAddress2
      postalAddress3
      postalCode
      vatNumber
      deposit
      marketValue
      erfNumber
      taxNumber
      days120
      days90
      days60
      days30
      current
      closingBalance
      openingBalance
      createdAt
    }
  }
`;


export const GET_CASH_PAYMENT = gql`
  query getCashPayment($accountNumber: String!) {
    getCashPayment(accountNumber: $accountNumber) {
      id
      accountNumber
      date
      code
      description
      units
      tariff
      value
      createdAt
    }
  }
`;


export const GET_INTEREST = gql`
  query getInterest($accountNumber: String!) {
    getInterest(accountNumber: $accountNumber) {
      id
      accountNumber
      date
      code
      description
      units
      tariff
      value
      createdAt
    }
  }
`;


export const GET_REFUSE = gql`
  query getRefuse($accountNumber: String!) {
    getRefuse(accountNumber: $accountNumber) {
      id
      accountNumber
      date
      code
      description
      units
      tariff
      value
      createdAt
    }
  }
`;

export const GET_SEWERAGE = gql`
  query getSewerage($accountNumber: String!) {
    getSewerage(accountNumber: $accountNumber) {
      id
      accountNumber
      date
      code
      description
      units
      tariff
      value
      createdAt
    }
  }
`;



export const GET_VAT = gql`
  query getVat($accountNumber: String!) {
    getVat(accountNumber: $accountNumber) {
      id
      accountNumber
      date
      code
      description
      units
      tariff
      value
      createdAt
    }
  }
`;


export const GET_WATER_TARIFF_DOMESTIC = gql`
  query getWaterTariffDomestic($accountNumber: String!) {
    getWaterTariffDomestic(accountNumber: $accountNumber) {
      id
      accountNumber
      date
      code
      description
      units
      tariff
      value
      createdAt
    }
  }
`;





export const GET_ALL_STATEMENTS = gql`
query getAllStatements{
  getAllStatements {
    accountNumber
    consumerName
    firstName
    lastName
    phoneNumber
    email
    province
    idNumber
    indigentExpiry
    date
    isIndigent
    indigentApplicationDate
    town
    suburb
    ward
    street
    postalAddress1
    postalAddress2
    postalAddress3
    postalCode
    vatNumber
    deposit
    marketValue
    erfNumber
    taxNumber
    days120
    days90
    days60
    days30
    current
    closingBalance
    openingBalance
    createdAt
  }
}
`;


export const GET_METER_READINGS = gql`
  query getMeterReadings($accountNumber: String!) {
    getMeterReadings(accountNumber: $accountNumber) {
      id
      accountNumber
      meterNumber
      type
      oldRead
      newRead
      consumption
      leviedAmount
      createdAt
    }
  }
`;


export const GET_SUCCESSFUL_EMAILS_COUNT = gql`
query getSuccessfulEmailsCount{
  getSuccessfulEmailsCount
}
`;


export const GET_FAILED_EMAILS_COUNT = gql`
query getFailedEmailsCount{
  getFailedEmailsCount
}
`;


export const GET_SUCCESSFUL_SMS_COUNT = gql`
query getSuccessfulSmsCount{
  getSuccessfulSmsCount
}
`


export const GET_FAILED_SMS_COUNT = gql`
query getFailedSmsCount{
  getFailedSmsCount
}
`

export const GET_USER_NOTIFICATIONS = gql`
  query getUserNotifications($accountNumber: String!) {
    getUserNotifications(accountNumber: $accountNumber) {
      emails {
        id
        accountNumber
        status
        createdAt
      }
      sms {
        id
        accountNumber
        status
        createdAt
      }
    }
  }

`;


export const GET_ALL_PAYMENT_ARRANGEMENTS = gql`
query getAllPaymentArrangements{
    getAllPaymentArrangements {
      accountNumber
      paymentDate
      amount
      createdAt
    }
  }
`;