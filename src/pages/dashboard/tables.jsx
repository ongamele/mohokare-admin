import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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

export function Tables() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);


  const [accountNumber, setAccountNumber ] = useState('');
  const [meterObj, setMeterObj] = useState({})
  const [detailsObj, setDetailsObj] = useState({})
  const [cashPaymentObj, setCashPaymentObj] = useState({})
  const [interestObj, setInterestObj] = useState({})
  const [refuseObj, setrefuseObj] = useState({})
  const [sewerageObj, setSewerageObj] = useState({})
  const [vatObj, setVatObj] = useState({})
  const [waterTariffDomesticObj, setWaterTariffDomesticObj] = useState({})
  
  
  const { data: allStatements } = useQuery(GET_ALL_STATEMENTS);

  
  





  const {
    loading: meterDataLoading,
    data: meterData,
    refetch: refetchMeterData,
  } = useQuery(GET_METER_READINGS, {
    variables: { accountNumber },
    onCompleted: (data) => {
      // Handle completed meterData query
      setMeterObj(data.getMeterReadings)
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
      setDetailsObj(data.getStatement)
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
      setCashPaymentObj(data.getCashPayment)
      
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
      //console.log('Interest data loaded:', data);
      setInterestObj(data.getInterest);
      
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
      setrefuseObj(data.getRefuse);
      
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
    
      setSewerageObj(data.getSewage)
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
      
      setVatObj(data.getVat)
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
      
      setWaterTariffDomesticObj(data.getWaterTariffDomestic);
      if (meterData) {
        //generatePDF(meterData, statementData,);
      }
    },
  });



   const manageDownload = async () => {
    handleOpen()
    var selectedStatement = {}
   // console.log(JSON.stringify(selectedStatement))
    selectedStatement.meterReadings = meterObj;
    selectedStatement.details = detailsObj
    selectedStatement.cashPayment = cashPaymentObj
    selectedStatement.interest = interestObj
    selectedStatement.refuse = refuseObj
    selectedStatement.sewerage = sewerageObj
    selectedStatement.vat = vatObj
    selectedStatement.waterTariffDomestic = waterTariffDomesticObj
   
    await generatePDF(selectedStatement)
   }

  const generatePDF = async (selectedStatement) => {

  
    const postalAddress1 = selectedStatement?.details?.postalAddress1 || '';
    const postalAddress2 = selectedStatement?.details?.postalAddress2 || '';
    const postalCode = selectedStatement?.details?.postalCode || '';
    const consumerName = selectedStatement?.details?.consumerName || '';
    const accountNumber = selectedStatement?.details?.accountNumber || '';
    const vatNumber = selectedStatement?.details?.vatNumber || '';
    const taxNumber = selectedStatement?.details?.taxNumber || '';
    const balance = selectedStatement?.details?.balance || '';
    const date = selectedStatement?.details?.date || '';

    const phoneNumber = selectedStatement?.details?.date || '';
    const email = selectedStatement?.details?.email || '';
    const province = selectedStatement?.details?.province || '';
    const town = selectedStatement?.details?.town || '';
    const suburb = selectedStatement?.details?.suburb || '';
    const ward = selectedStatement?.details?.ward || '';
    const street = selectedStatement?.details?.street || '';
    const marketValue = selectedStatement?.details?.marketValue || '';
    const erfNumber = selectedStatement?.details?.erfNumber || '';
    const days120 = selectedStatement?.details?.days120 || '';
    const days90 = selectedStatement?.details?.days90 || '';
    const days60 = selectedStatement?.details?.days60 || '';
    const days30 = selectedStatement?.details?.days30 || '';
    const deposit = selectedStatement?.details?.deposit || '';
    const current = selectedStatement?.details?.current || '';
    const closingBalance = selectedStatement?.details?.closingBalance || '';
    const openingBalance = parseInt(current) - parseInt(closingBalance);


    const meterNumber = selectedStatement?.meterReadings?.meterNumber || '';
    const meterType =selectedStatement?.meterReadings?.type || '';
    const oldRead = selectedStatement?.meterReadings?.oldRead || '';
    const newRead = selectedStatement?.meterReadings?.newRead || '';
    const consumption = selectedStatement?.meterReadings?.consuption || '';
    

    const cashPaymentDate = selectedStatement?.cashPayment?.date || '';
    const cashPaymentCode = '';
    const cashPaymentDescription = selectedStatement?.cashPayment?.description || '';
    const cashPaymentUnits = selectedStatement?.cashPayment?.units || '';
    const cashPaymentTariff = '000000';
    const cashPaymentValue = selectedStatement?.cashPayment?.value || '';

    const interestDate = selectedStatement?.interest?.date || '';
    const interestCode = '009009';
    const interestDescription = selectedStatement?.interest?.description || '';
    const interestUnits = selectedStatement?.interest?.units || '';
    const interestTariff = '';
    const interestValue = selectedStatement?.interest?.value || '';

    const refuseDate = selectedStatement?.refuse?.date || '';
    const refuseCode = '050010';
    const refuseDescription = selectedStatement?.refuse?.description || '';
    const refuseUnits = selectedStatement?.refuse?.units || '';
    const refuseTariff = '72.430000';
    const refuseValue = selectedStatement?.refuse?.value || '';

    const sewerageDate = selectedStatement?.sewerage?.date || '';
    const sewerageCode = '050010';
    const sewerageDescription = selectedStatement?.sewerage?.description || '';
    const sewerageUnits = selectedStatement?.sewerage?.units || '';
    const sewerageTariff = '126.870000';
    const sewerageValue = selectedStatement?.sewerage?.value || '';


    const vatDate = selectedStatement?.vat?.date || '';
    const vatCode = '008888';
    const vatDescription = selectedStatement?.vat?.description || '';
    const vatUnits = selectedStatement?.vat?.units || '';
    const vatTariff = '';
    const vatValue = selectedStatement?.vat?.value || '';

    const waterTariffDomesticeDate = selectedStatement?.waterTariffDomestic?.date || '';
    const waterTariffDomesticCode = '041001';
    const waterTariffDomesticDescription = selectedStatement?.waterTariffDomestic?.description || '';
    const waterTariffDomesticUnits = selectedStatement?.waterTariffDomestic?.units || '';
    const waterTariffDomesticTariff = '12.000000';
    const waterTariffDomesticValue = selectedStatement?.waterTariffDomestic?.value || '';

   




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
    doc.text(`${postalAddress1}, ${postalAddress2} ${postalCode}`, 140, 22);
    doc.text('Tel:(051) 673 9600', 140, 28);
    doc.text('Fax: (051) 673 1550', 140, 34);
    doc.text(`Vat No.: ${vatNumber}`, 140, 40);
  
    doc.line(5, 43, 205, 43);
  
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('TAX INVOICE/STATEMENT OF ACCOUNT', 70, 50);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
  
    const column1 = ['Account Number:', 'Consumer Name:', 'Postal Address:', 'Postal Code:', 'Internet Pin:', 'Account Date:', 'Tax Invoice No.:', 'Vat Registration No.:'];
    const column2 = [accountNumber, consumerName, postalAddress2, postalCode, '', , date, taxNumber, vatNumber];
  
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
    doc.text(erfNumber, 160, 60);
  
    doc.text('Market Value:', 110, 66);
    doc.text('352,500.00', 160, 66);
  
    doc.text('Street:', 110, 72);
    doc.text(street, 160, 72);
  
    doc.text('Land Area:', 110, 78);
    doc.text('2141.0000', 160, 78);
  
    doc.text('Deposit:', 110, 84);
    doc.text(deposit, 160, 84);
  
    doc.line(5, 110, 205, 110);
  
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('METER READINGS', 80, 116);
  
    const headers = ['Meter No', 'Meter Type', 'Old Reading', 'New Reading', 'Consumption'];
    const data = [[meterNumber, meterType, oldRead, newRead, consumption]];
  
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
    const data3 = [[date, '', 'Opening Balance', '', '', openingBalance][date, cashPaymentCode, cashPaymentDescription, cashPaymentUnits, cashPaymentTariff, cashPaymentValue], [date, refuseCode, refuseDescription, refuseUnits, refuseTariff, refuseValue], [date, sewerageCode, sewerageDescription, sewerageUnits, sewerageTariff, sewerageValue], [date, waterTariffDomesticCode, waterTariffDomesticDescription, waterTariffDomesticUnits, waterTariffDomesticTariff, waterTariffDomesticValue], [date, vatCode, vatDescription, vatUnits, vatTariff, vatValue], [date, interestCode, interestDescription, interestUnits, interestTariff, interestValue]];
  
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
    const daysData = [[days120, days90, days60, days30, current, closingBalance]];
  
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
                     "ACCOUNT NUMBER: " +{accountNumber}+"\n" +
                     "CONSUMER NAME: " +{consumerName}+"\n" +
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
    <>
  
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Report Download
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="blue"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="black" variant="h4">
            Download PDF?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={() => manageDownload()}>
            Ok
          </Button>
        </DialogFooter>
      </Dialog>
   
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users
          </Typography>
          
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        
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
                    onClick={() => {setAccountNumber(statement.accountNumber); handleOpen()}}
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
    </>
  );
}

export default Tables;
