import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
Select,
Option
} from "@material-tailwind/react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link, useParams, useNavigate } from "react-router-dom";
import imgSrc from "../../images/municipalityLogo.jpg";
import yeboPayLogo from "../../images/yeboPay-logo.png";

import absaLogo from "../../images/banks/absa.png";
import africanBankLogo from "../../images/banks/africanBank.png";
import capitecLogo from "../../images/banks/capitec.png";
import nedbankLogo from "../../images/banks/nedbank.png";
import postOfficeLogo from "../../images/banks/postOffice.png";
import standardBankLogo from "../../images/banks/standardBank.png";

import { GET_METER_READINGS } from "../../Graphql/Queries";
import { GET_STATEMENT } from "../../Graphql/Queries";
import { GET_CASH_PAYMENT } from "../../Graphql/Queries";
import { GET_INTEREST } from "../../Graphql/Queries";
import { GET_REFUSE } from "../../Graphql/Queries";
import { GET_SEWERAGE } from "../../Graphql/Queries";
import { GET_VAT } from "../../Graphql/Queries";
import { GET_WATER_TARIFF_DOMESTIC } from "../../Graphql/Queries";

import './styles.css'
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export function Download() {
  const param = useParams();


const accountNumber = param.accountNumber;
 
function removeLeadingZero(str) {
  // Check if the string starts with '0'
  if (str.charAt(0) === '0') {
      // Remove the first character (i.e., the leading zero)
      return str.substring(1);
  } else {
      // If it doesn't start with '0', return the original string
      return str;
  }
}



const {
  loading: meterDataLoading,
  data: meterData,
  refetch: refetchMeterData
} = useQuery(GET_METER_READINGS, {
  variables: { accountNumber: accountNumber}
});

console.log("test resdings ", JSON.stringify(meterData))








  const {
    loading: statementDataLoading,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(GET_STATEMENT, {
    variables: { accountNumber },

  });

  const {
    loading: cashPaymentDataLoading,
    data: cashPaymentData,
    refetch: refetchCashPaymentData,
  } = useQuery(GET_CASH_PAYMENT, {
    variables: { accountNumber },
   
  });


  const {
    loading: interestDataLoading,
    data: interestData,
    refetch: refetchInterestData,
  } = useQuery(GET_INTEREST, {
    variables: { accountNumber },
  
  });



  const {
    loading: refuseDataLoading,
    data: refuseData,
    refetch: refetchRefuseData,
  } = useQuery(GET_REFUSE, {
    variables: { accountNumber },
  
  });


  const {
    loading: sewerageDataLoading,
    data: sewerageData,
    refetch: refetchSewerageData,
  } = useQuery(GET_SEWERAGE, {
    variables: { accountNumber },
  });




  const {
    loading: vatDataLoading,
    data: vatData,
    refetch: refetchSVatData,
  } = useQuery(GET_VAT, {
    variables: { accountNumber },

  });


  const {
    loading: waterTariffDomesticDataLoading,
    data: waterTariffDomesticData,
    refetch: refetchSWaterTariffDomesticData,
  } = useQuery(GET_WATER_TARIFF_DOMESTIC, {
    variables: { accountNumber },
 
  });



  useEffect(() => {
    if (!statementDataLoading && statementData && !meterDataLoading && !cashPaymentDataLoading && !waterTariffDomesticDataLoading && !interestDataLoading && !refuseDataLoading && !sewerageDataLoading && !vatDataLoading && cashPaymentData) {

      generatePDF();
    }
  }, [statementData, statementData, meterData, interestData, vatData, waterTariffDomesticData, sewerageData, refuseData, cashPaymentData]);



 
  const generatePDF = async () => {

    
   
    const postalAddress1 = await statementData?.getStatement?.postalAddress1 || '';
    const postalAddress2 = await statementData?.getStatement?.postalAddress2 || '';
    const postalCode = await statementData?.getStatement?.postalCode || '';
    const consumerName = await statementData?.getStatement?.consumerName || '';
    const accountNumber = await statementData?.getStatement?.accountNumber || '';
    const vatNumber = await statementData?.getStatement?.vatNumber || '';
    const taxNumber = await statementData?.getStatement?.taxNumber || '';
    const date = await statementData?.getStatement?.date || '';

    let d120 = statementData?.getStatement?.days120.toFixed(2) || 0;
    let d90 = statementData?.getStatement?.days90.toFixed(2) || 0;
    let d60 = statementData?.getStatement?.days60.toFixed(2) || 0;
    let d30 = statementData?.getStatement?.days30.toFixed(2) || 0;
    let dCurrent = statementData?.getStatement?.current.toFixed(2) || 0;

    const phoneNumber = statementData?.getStatement?.date || '';
    const email = statementData?.getStatement?.email || '';
    const province = statementData?.getStatement?.province || '';
    const town = statementData?.getStatement?.town || '';
    const suburb = statementData?.getStatement?.suburb || '';
    const ward = statementData?.getStatement?.ward || '';
    const street = statementData?.getStatement.street || '';
    const marketValue = statementData?.getStatement?.marketValue || '';
    const erfNumber = statementData?.getStatement?.erfNumber || '';
    const days120 = d120;
    const days90 = d90;
    const days60 = d60;
    const days30 = d30;
    const deposit = statementData?.getStatement?.deposit || '';
    const current = dCurrent;
    const closingBalance = statementData?.getStatement?.closingBalance || '';
    const openingBalance = Number(current) - Number(closingBalance);


    
    const meterNumber = meterData?.getMeterReadings?.meterNumber || '';
    const meterType =meterData?.getMeterReadings?.type || '';
    const oldRead = meterData?.getMeterReadings?.oldRead || '';
    const newRead = meterData?.getMeterReadings?.newRead || '';
    const consumption = meterData?.getMeterReadings?.consumption || '';
    const leviedAmount = meterData?.getMeterReadings?.leviedAmount || '';
    

    const cashPaymentDate = cashPaymentData?.getCashPayment?.date || '';
    const cashPaymentCode = cashPaymentData?.getCashPayment?.code;
    const cashPaymentDescription = 'Cash Payment';
    const cashPaymentUnits = cashPaymentData?.getCashPayment?.units || '';
    const cashPaymentTariff = cashPaymentData?.getCashPayment?.tariff || '';
    const cashPaymentValue = cashPaymentData?.getCashPayment?.value || '';

    const interestDate = interestData?.getInterest?.date || '';
    const interestCode = interestData?.getInterest?.code || '';
    const interestDescription = 'Interest';
    const interestUnits = interestData?.getInterest?.units || '';
    const interestTariff = interestData?.getInterest?.tariff || '';
    const interestValue = interestData?.getInterest?.value || '';

    const refuseDate = refuseData?.getRefuse?.date || '';
    const refuseCode = refuseData?.getRefuse?.code || '';
    const refuseDescription = 'Refuse';
    const refuseUnits = refuseData?.getRefuse?.units || '';
    const refuseTariff = refuseData?.getRefuse?.tariff || '';
    const refuseValue = refuseData?.getRefuse?.value || '';

    const sewerageDate = sewerageData?.getSewerage?.date || '';
    const sewerageCode = sewerageData?.getSewerage?.code ;
    const sewerageDescription = 'Sewerage';
    const sewerageUnits = sewerageData?.getSewerage?.units || '';
    const sewerageTariff = sewerageData?.getSewerage?.tariff;
    const sewerageValue = sewerageData?.getSewerage?.value || '';


    const vatDate = vatData?.getVat?.date || '';
    const vatCode = vatData?.getVat?.code || '';
    const vatDescription = 'VAT';
    const vatUnits = vatData?.getVat?.units || '';
    const vatTariff = vatData?.getVat?.tariff || '';
    const vatValue = vatData?.getVat?.value || '';

    const waterTariffDomesticeDate = waterTariffDomesticData?.getWaterTariffDomestic?.date || '';
    const waterTariffDomesticCode = waterTariffDomesticData?.getWaterTariffDomestic?.code || '';
    const waterTariffDomesticDescription = 'Water';
    const waterTariffDomesticUnits = waterTariffDomesticData?.getWaterTariffDomestic?.units || '';
    const waterTariffDomesticTariff = waterTariffDomesticData?.getWaterTariffDomestic?.tariff || '';
    const waterTariffDomesticValue = waterTariffDomesticData?.getWaterTariffDomestic?.value || '';
    
    




    let left = 20;
    let top = 6;
    const imgWidth = 40;
    const imgHeight = 20;




    
    



  
    const doc = new jsPDF();






    var img = new Image();
    var yeboImg = new Image();
    var absaImg = new Image();
    var africanBankImg = new Image();
    var capitecImg = new Image();
    var nedbankImg = new Image();
    var postOfficeImg = new Image();
    var standardBankImg = new Image();

    img.src = imgSrc;
    yeboImg.src = yeboPayLogo;
    absaImg.src = absaLogo
    africanBankImg.src = africanBankLogo
    capitecImg.src = capitecLogo
    nedbankImg.src = nedbankLogo
    postOfficeImg.src = postOfficeLogo
    standardBankImg.src = standardBankLogo
    doc.addImage(img, "png", left, top, imgWidth, imgHeight);

        // Add a border around the entire PDF
    doc.rect(5, 5, 200, 286);
  
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('MOHOKARE LOCAL MUNICIPALITY', 140, 10);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('MOHOKARE LOCAL MUNICIPALITY', 140, 14);
    doc.text('1 Hoofd Street, Zastron 9950', 140, 18);
    doc.text('Tel:(051) 673 9600', 140, 22);
    doc.text('Fax: (051) 673 1550', 140, 26);
    doc.text(`Vat No.: ${vatNumber}`, 140, 30);
  
    doc.line(5, 34, 205, 34);
  
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('TAX INVOICE/STATEMENT OF ACCOUNT', 70, 40);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
  
    const column1 = ['Account Number:', 'Consumer Name:', 'Postal Address:', 'Postal Code:', 'Internet Pin:', 'Account Date:', 'Tax Invoice No.:', 'Vat Registration No.:'];
    const column2 = [accountNumber, consumerName, postalAddress2, postalCode, '',date, taxNumber, vatNumber, ''];
  
    const x1 = 20;
    const x2 = 50;
    const lineHeight = 4;
  
    column1.forEach((line, index) => {
      const yPosition = 50 + index * lineHeight;
      doc.text(line, x1, yPosition);
    });
  
    column2.forEach((line, index) => {
      const yPosition = 50 + index * lineHeight;
      doc.text(line, x2, yPosition);
    });
  
    doc.text('ERF Description:', 110, 50);
    doc.text(erfNumber, 140, 50);
  
    doc.text('Market Value:', 110, 54);
    doc.text(marketValue, 140, 54);
  
    doc.text('Street:', 110, 58);
    doc.text(street, 140, 58);
  
    doc.text('Land Area:', 110, 62);
    doc.text('2141.0000', 140, 62);
  
    doc.text('Deposit:', 110, 66);
    doc.text(deposit, 140, 66);
  
    doc.line(5, 84, 205, 84);
  
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('METER READINGS', 80, 90);
  
    const headers = ['Meter No', 'Meter Type', 'Old Reading', 'New Reading', 'Consumption','LEVIED AMOUNT'];
    const data = [[meterNumber, meterType, oldRead, newRead, consumption, leviedAmount]];
    
  
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 94,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 1,
        valign: 'middle',
        lineColor: [0, 0, 0]
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
      columnStyles: {
        // Set the height of all columns to 20 (for example)
        '*': { cellHeight: 8 }
      }
    });
  
  
  
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('ACCOUNT DETAILS', 80, 110);
  
    const headers2 = ['Date', 'Code', 'Description', 'Units', 'Tariff', 'Value'];
    const data3 = [['', '', 'Opening Balance', '', '', openingBalance], [date, cashPaymentCode, cashPaymentDescription, cashPaymentUnits, cashPaymentTariff, cashPaymentValue], [date, refuseCode, refuseDescription, refuseUnits, refuseTariff, refuseValue], [date, sewerageCode, sewerageDescription, sewerageUnits, sewerageTariff, sewerageValue], [date, waterTariffDomesticCode, waterTariffDomesticDescription, waterTariffDomesticUnits, waterTariffDomesticTariff, waterTariffDomesticValue], ['', vatCode, vatDescription, vatUnits, vatTariff, vatValue], ['', interestCode, interestDescription, interestUnits, interestTariff, interestValue]];
  
    doc.autoTable({
      head: [headers2],
      body: data3,
      startY: doc.autoTable.previous.finalY + 10,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 1,
        valign: 'middle',
        lineColor: [0, 0, 0]
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
      columnStyles: {
        // Set the height of all columns to 20 (for example)
        '*': { cellHeight: 8 }
      }
    });


    const daysHeaders = ['120+ Days', '90 Days', '60 Days', '30 Days', 'Current', 'Closing Balance'];
    const daysData = [[days120, days90, days60, days30, current, closingBalance]];
  
    doc.autoTable({
      head: [daysHeaders],
      body: daysData,
      startY: doc.autoTable.previous.finalY + 6,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 1,
        valign: 'middle',
        lineColor: [0, 0, 0]
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
      columnStyles: {
        // Set the height of all columns to 20 (for example)
        '*': { cellHeight: 8 }
      }
    });
  
   
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
  
    var remittanceText = "REMITTANCE ADVICE\n" +
                     `ACCOUNT NUMBER: ${accountNumber}`+"\n" +
                     `CONSUMER NAME: ${consumerName}`+"\n" +
                     `TOTAL DUE: ${closingBalance}`+"\n" 

doc.text(15, 179, remittanceText);

// Add Banking Details
var bankingDetailsText = "BANK NAME: FNB\n" +
                         "ACCOUNT NAME: Mohokare Local Municipality\n" +
                         "ACCOUNT NUMBER: 53593549308\n" +
                         "BRANCH CODE: 250655\n" +
                         "REFERENCE: 0100450001";

doc.text(124, 179, bankingDetailsText);

doc.setFont(undefined, 'bold');
doc.setFontSize(10);
doc.setTextColor(0, 0, 0);
doc.text('CLICK LOGO BELOW TO SETTLE YOUR ACCOUNT', 56, 206);
doc.setFont(undefined, 'normal');
doc.setFontSize(8);
doc.setTextColor(0, 0, 0);
doc.text('Click on the logo below to go to the banking page and settle your accounts.', 54, 214);

let leftYeboPay = 85;
doc.addImage(yeboImg, "png", leftYeboPay, 222, 30, 9);
doc.link(leftYeboPay, 222, 30, 9, { url: `http://localhost:5175/yebo-pay/${accountNumber}` });

const spacing = 30 // Space between images
const y = 250; // Y-coordinate for all images
const width = 30; // Width for all images
const height = 24; // Height for all images

doc.addImage(absaImg, "png", 20, y, width, height);
doc.addImage(africanBankImg, "png", 20 + spacing, y, width, height);
doc.addImage(capitecImg, "png", 20 + 2 * spacing, y, width, 10);
doc.addImage(nedbankImg, "png", 20 + 3 * spacing, y, width, height);
doc.addImage(postOfficeImg, "png", 20 + 4 * spacing, y, width, height);
doc.addImage(standardBankImg, "png", 20 + 5 * spacing, y, width, 30);

doc.link(20, y, width, height, { url: 'https://www.absa.co.za/' });
doc.link(20 + spacing, y, width, height, { url: 'https://africanbank.co.za/en/home/' });
doc.link(20 + 2 * spacing, y, width, 10, { url: 'https://www.capitecbank.co.za/' });
doc.link(20 + 3 * spacing, y, width, height, { url: 'https://personal.nedbank.co.za/home.html' });
doc.link(20 + 4 * spacing, y, width, height, { url: 'https://www.postoffice.co.za/' });
doc.link(20 + 5 * spacing, y, width, 30, { url: 'https://www.standardbank.co.za/' });


  
    doc.save('statement.pdf'); 
  };

  return (
    <>
  

    <h1 style={{textAlign: "center"}}>Thanky You. From Mohokare</h1>
      
    </>
  );
}

export default Download;
