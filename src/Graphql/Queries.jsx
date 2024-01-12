import { gql } from "@apollo/client";



export const GET_STATEMENT= gql`
  query getStatement($accountNumber: String!) {
    getStatement(accountNumber: $accountNumber) {
      accountNumber
      consumerName
      phoneNumber
      email
      province
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


export const GET_WATER_TARIFF_DOMESTIC_BASIC = gql`
  query getWaterTariffDomesticBasic($accountNumber: String!) {
    getWaterTariffDomesticBasic(accountNumber: $accountNumber) {
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
    phoneNumber
    email
    province
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
      type
      oldRead
      newRead
      consumption
      leviedAmount
      createdAt
    }
  }
`;