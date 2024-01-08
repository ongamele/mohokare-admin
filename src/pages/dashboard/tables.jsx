import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Input,
  Button
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useQuery } from "@apollo/react-hooks";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imgSrc from "../../images/municipalityLogo.jpg";
import { GET_ALL_STATEMENTS } from "../../Graphql/Queries";
import { GET_METER_READINGS } from "../../Graphql/Queries";
import { GET_STATEMENT } from "../../Graphql/Queries";
import { GET_CASH_PAYMENT } from "../../Graphql/Queries";
import { GET_INTEREST } from "../../Graphql/Queries";
import { GET_REFUSE } from "../../Graphql/Queries";
import { GET_SEWERAGE } from "../../Graphql/Queries";
import { GET_VAT } from "../../Graphql/Queries";
import { GET_WATER_TARIFF_DOMESTIC } from "../../Graphql/Queries";
import { GET_WATER_TARIFF_DOMESTIC_BASIC } from "../../Graphql/Queries";

export function Tables() {
  const [accountNumber, setAccountNumber ] = useState('');
  const { data: allStatements } = useQuery(GET_ALL_STATEMENTS);


  const {
    loading: meterDataLoading,
    data: meterData,
    refetch: refetchMeterData,
  } = useQuery(GET_METER_READINGS, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed meterData query
      console.log('Meter data loaded:', data);
      if (statementData) {
        //generatePDF(meterData, statementData);
      }
    },
  });

  const {
    loading: statementDataLoading,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(GET_STATEMENT, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Statement data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData);
      }
    },
  });

  const {
    loading: cashPaymentDataLoading,
    data: cashPaymentData,
    refetch: refetchCashPaymentData,
  } = useQuery(GET_CASH_PAYMENT, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Cash Balance data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData);
      }
    },
  });


  const {
    loading: interestDataLoading,
    data: interestData,
    refetch: refetchInterestData,
  } = useQuery(GET_INTEREST, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Interest data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });



  const {
    loading: refuseDataLoading,
    data: refuseData,
    refetch: refetchRefuseData,
  } = useQuery(GET_REFUSE, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Refuse data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });


  const {
    loading: sewerageDataLoading,
    data: sewerageData,
    refetch: refetchSewerageData,
  } = useQuery(GET_SEWERAGE, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Sewerage data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });


  const {
    loading: vatDataLoading,
    data: vatData,
    refetch: refetchSVatData,
  } = useQuery(GET_VAT, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Vat data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });


  const {
    loading: waterTariffDomesticDataLoading,
    data: waterTariffDomesticData,
    refetch: refetchSWaterTariffDomesticData,
  } = useQuery(GET_WATER_TARIFF_DOMESTIC, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('VWater Tariff Domestic Data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });


  const {
    loading: waterTariffDomesticBasicDataLoading,
    data: waterTariffDomesticBasicData,
    refetch: refetchSWaterTariffDomesticBasicData,
  } = useQuery(GET_WATER_TARIFF_DOMESTIC_BASIC, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed statementData query
      console.log('Water Tariff Domestic Basic Data loaded:', data);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });

  const generatePDF = async (meterData, statementData) => {

  
    console.log(JSON.stringify(statementData));

    let left = 20;
    let top = 6;
    const imgWidth = 40;
    const imgHeight = 20;
  
    const doc = new jsPDF();
    var img = new Image();
    img.src = imgSrc;
    doc.addImage(img, "png", left, top, imgWidth, imgHeight);

        // Add a border around the entire PDF
        doc.rect(5, 5, 200, 286);
  
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('MOHOKARE LOCAL MUNICIPALITY', 140, 10);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('MOHOKARE LOCAL MUNICIPALITY', 140, 16);
    doc.text('1 Hoofd Street, Zastron 9950', 140, 22);
    doc.text('Tel:(051) 673 9600', 140, 28);
    doc.text('Fax: (051) 673 1550', 140, 34);
    doc.text('Vat No.:4000846412', 140, 40);
  
    doc.line(5, 43, 205, 43);
  
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('TAX INVOICE/STATEMENT OF ACCOUNT', 70, 50);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
  
    const column1 = ['Account Number:', 'Consumer Name:', 'Postal Address:', 'Postal Code:', 'Internet Pin:', 'Account Date:', 'Tax Invoice No.:', 'Vat Registration No.:'];
    const column2 = ['0120102001', 'LANGUZA SN', '27 ZASTRON', '', '972674080', '30 APR 2023', '0100450001202304', ''];
  
    const x1 = 20;
    const x2 = 70;
    const lineHeight = 6;
  
    column1.forEach((line, index) => {
      const yPosition = 60 + index * lineHeight;
      doc.text(line, x1, yPosition);
    });
  
    column2.forEach((line, index) => {
      const yPosition = 60 + index * lineHeight;
      doc.text(line, x2, yPosition);
    });
  
    doc.text('ERF Description:', 110, 60);
    doc.text('10000 000000308', 160, 60);
  
    doc.text('Market Value:', 110, 66);
    doc.text('352,500.00', 160, 66);
  
    doc.text('Street:', 110, 72);
    doc.text('27 VOORTREKKER', 160, 72);
  
    doc.text('Land Area:', 110, 78);
    doc.text('2141.0000', 160, 78);
  
    doc.text('Deposit:', 110, 84);
    doc.text('95.00', 160, 84);
  
    doc.line(5, 110, 205, 110);
  
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('METER READINGS', 80, 116);
  
    const headers = ['Meter No', 'Meter Type', 'Old Reading', 'New Reading', 'Consumption'];
    const data = [['123', 'Water', '1000', '1100', '100']];
  
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 120,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
    });
  
  
  
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('ACCOUNT DETAILS', 80, 140);
  
    const headers2 = ['Date', 'Code', 'Description', 'Units', 'Tariff', 'Value'];
    const data3 = [['11/09/2023', '008888', 'Opening Balance', '1204', '000000', '2,120'], ['11/09/2023', '001953', 'Cash Payment', '0000', '000000', '0'], ['11/09/2023', '008400', 'Refuse Res', '600', '66.1000', '66'], ['11/09/2023', '054260', 'Cash Payment', '0000', '000000', '0'], ['10/06/2023', '004662', 'Sewage Res', '600', '104.32000', '104.3'], ['11/09/2023', '', 'Cash Payment', '0000', '000000', '0'], ['11/09/2023', '078423', 'Water Tarif 1', '2.200', '9.00000', '40.42'], ['11/09/2023', '', 'Cash Payment', '0000', '000000', '0'], ['11/09/2023', '', 'Water Rariff 1', '0', '0', '0'], ['11/09/2023', '004838', 'Cash Payment', '0000', '000000', '0'], ['', '005306', 'Vat', '', '', '12.30'], ['', '005306', 'Interest', '', '', '1.35']];
  
    doc.autoTable({
      head: [headers2],
      body: data3,
      startY: doc.autoTable.previous.finalY + 10,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
    });


    const daysHeaders = ['120+ Days', '90 Days', '60 Days', '30 Days', 'Current', 'Closing Balance'];
    const daysData = [['0.00', '0.00', '0.00', '2.140', '234.0' , '214.4']];
  
    doc.autoTable({
      head: [daysHeaders],
      body: daysData,
      startY: 240,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
      },
      headStyles: { fillColor: [185, 185, 185], textColor: '#000000' },
    });
  
   
  
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
  
    var remittanceText = "REMITTANCE\n" +
                     "ACCOUNT NUMBER: 0120102001\n" +
                     "CONSUMER NAME: LANGUZA SN\n" +
                     "TOTAL DUE: 2,620.60\n" +
                     "TOTAL DUE ON OR BEFORE: 02/06/2023";

doc.text(15, doc.internal.pageSize.height - 20, remittanceText);

// Add Banking Details
var bankingDetailsText = "BANK NAME: FNB\n" +
                         "ACCOUNT NAME: Mohokare Local Municipality\n" +
                         "ACCOUNT NUMBER: 53593549308\n" +
                         "BRANCH CODE: 250655\n" +
                         "REFERENCE: 0100450001";

doc.text(140, doc.internal.pageSize.height - 20, bankingDetailsText);



  
    doc.save('statement.pdf');
  };
  



  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
         <h1>{accountNumber}</h1>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User", "status", "Created", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <Button onClick={generatePDF}>Download Statement</Button>
        </CardBody>
      </Card>
      <Typography variant="h40" style={{color: "#3855E5", fontSize: 12, marginBottom: -10}}>
            Search by account number, ID NO, Name, Company Reg
          </Typography>
      <Input
            size="lg"
            type="text"
            placeholder="Search..."
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
      <Card>
      
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Statements
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
          <thead>
              <tr>
                {["Account Number", "Account Holder","Date", "Province"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
            {allStatements && allStatements.getAllStatements.map((statement, index) => (
              
              <tr key={index}>
                <td className="py-3 px-5">
                      
                        {statement.accountNumber}
                     
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {statement.consumerName}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                {statement.createdAt && statement.createdAt.substring(0, 10)}
                </td>
              
                <td className="">
                  <Typography
                    className="text-xs font-semibold text-blue-gray-600"
                  >
                    {statement.province}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography
                    as="a"
                    href="#"
                    className="text-xs font-semibold text-blue-gray-600"
                    onClick={() => setAccountNumber(statement.accountNumber)}
                  >
                    Download
                  </Typography>
                </td>
              </tr>
            ))}
            
            
          
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
