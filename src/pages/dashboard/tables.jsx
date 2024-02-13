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
import { authorsTableData, projectsTableData } from "@/data";
import { useQuery, useMutation } from "@apollo/react-hooks";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import imgSrc from "../../images/municipalityLogo.jpg";
import yeboPayLogo from "../../images/yeboPay-logo.png";
import { GET_ALL_STATEMENTS } from "../../Graphql/Queries";
import { GET_METER_READINGS } from "../../Graphql/Queries";
import { GET_STATEMENT } from "../../Graphql/Queries";
import { GET_CASH_PAYMENT } from "../../Graphql/Queries";
import { GET_INTEREST } from "../../Graphql/Queries";
import { GET_REFUSE } from "../../Graphql/Queries";
import { GET_SEWERAGE } from "../../Graphql/Queries";
import { GET_VAT } from "../../Graphql/Queries";
import { GET_WATER_TARIFF_DOMESTIC } from "../../Graphql/Queries";

import { CREATE_USER_NOTIFICATIONS } from "../../Graphql/Mutations";
import { CREATE_USER_EMAIL_NOTIFICATIONS } from "../../Graphql/Mutations";
import { CREATE_USER_SMS_NOTIFICATIONS } from "../../Graphql/Mutations";
import { UPDATE_USER_DETAILS } from "../../Graphql/Mutations";

import { GET_USER_NOTIFICATIONS } from "../../Graphql/Queries";
import './styles.css'

export function Tables() {
  const [open, setOpen] = useState(false);
  const [openStat, setOpenStat] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [filterValue, setFilterValue] = useState('');
 const [accountNumberEdit, setAccountNumberEdit ] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');


 
  const handleOpenStat = () => setOpenStat(!openStat);
  const handleOpen = () => setOpen(!open);
  const handleOpenEdit = () => setOpenEdit(!openEdit);


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

  
  



  const filteredStatements = allStatements?.getAllStatements.filter(statement =>
    statement.consumerName.includes(filterValue) || statement.accountNumber.includes(filterValue) || statement.idNumber.includes(filterValue)
    
  );


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
      
      setSewerageObj(data.getSewerage)
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

  const handleClickDownload = async (accNumber) => {
    setAccountNumber(accNumber); 
    await handleOpen()
  }



  const manageDownload = async () => {
    
    var selectedStatement = {};

    selectedStatement.meterReadings = meterObj;
    selectedStatement.details = detailsObj;
    selectedStatement.cashPayment = cashPaymentObj;
    selectedStatement.interest = interestObj;
    selectedStatement.refuse = refuseObj;
    selectedStatement.sewerage = sewerageObj;
    selectedStatement.vat = vatObj;
    selectedStatement.waterTariffDomestic = waterTariffDomesticObj;

  

    await generatePDF(selectedStatement);

    await handleOpen();
}

  const generatePDF = async (selectedStatement) => {
   
   
    const postalAddress1 = selectedStatement?.details?.postalAddress1 || '';
    const postalAddress2 = selectedStatement?.details?.postalAddress2 || '';
    const postalCode = selectedStatement?.details?.postalCode || '';
    const consumerName = selectedStatement?.details?.consumerName || '';
    const accountNumber = selectedStatement?.details?.accountNumber || '';
    const vatNumber = selectedStatement?.details?.vatNumber || '';
    const taxNumber = selectedStatement?.details?.taxNumber || '';
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
    const days30 = selectedStatement?.details?.days30 || '0';
    const deposit = selectedStatement?.details?.deposit || '';
    const current = selectedStatement?.details?.current || '';
    const closingBalance = selectedStatement?.details?.closingBalance || '';
    const openingBalance = Number(current) - Number(closingBalance);


    
    const meterNumber = selectedStatement?.meterReadings?.meterNumber || '';
    const meterType =selectedStatement?.meterReadings?.type || '';
    const oldRead = selectedStatement?.meterReadings?.oldRead || '';
    const newRead = selectedStatement?.meterReadings?.newRead || '';
    const consumption = selectedStatement?.meterReadings?.consumption || '';
    const leviedAmount = selectedStatement?.meterReadings?.leviedAmount || '';
    

    const cashPaymentDate = selectedStatement?.cashPayment?.date || '';
    const cashPaymentCode = '';
    const cashPaymentDescription = 'Cash Payment';
    const cashPaymentUnits = selectedStatement?.cashPayment?.units || '';
    const cashPaymentTariff = '000000';
    const cashPaymentValue = selectedStatement?.cashPayment?.value || '';

    const interestDate = selectedStatement?.interest?.date || '';
    const interestCode = '009009';
    const interestDescription = 'Interest';
    const interestUnits = selectedStatement?.interest?.units || '';
    const interestTariff = '';
    const interestValue = selectedStatement?.interest?.value || '';

    const refuseDate = selectedStatement?.refuse?.date || '';
    const refuseCode = '050010';
    const refuseDescription = 'Refuse';
    const refuseUnits = selectedStatement?.refuse?.units || '';
    const refuseTariff = '72.430000';
    const refuseValue = selectedStatement?.refuse?.value || '';

    const sewerageDate = selectedStatement?.sewerage?.date || '';
    const sewerageCode = '050010';
    const sewerageDescription = 'Sewerage';
    const sewerageUnits = selectedStatement?.sewerage?.units || '';
    const sewerageTariff = '126.870000';
    const sewerageValue = selectedStatement?.sewerage?.value || '';


    const vatDate = selectedStatement?.vat?.date || '';
    const vatCode = '008888';
    const vatDescription = 'VAT';
    const vatUnits = selectedStatement?.vat?.units || '';
    const vatTariff = '';
    const vatValue = selectedStatement?.vat?.value || '';

    const waterTariffDomesticeDate = selectedStatement?.waterTariffDomestic?.date || '';
    const waterTariffDomesticCode = '041001';
    const waterTariffDomesticDescription = 'Water';
    const waterTariffDomesticUnits = selectedStatement?.waterTariffDomestic?.units || '';
    const waterTariffDomesticTariff = '12.000000';
    const waterTariffDomesticValue = selectedStatement?.waterTariffDomestic?.value || '';
    
    




    let left = 20;
    let top = 6;
    const imgWidth = 40;
    const imgHeight = 20;
  
    const doc = new jsPDF();
    var img = new Image();
    var yeboImg = new Image();
    img.src = imgSrc;
    yeboImg.src = yeboPayLogo;
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
    const column2 = [accountNumber, consumerName, postalAddress2, postalCode, '',date, taxNumber, vatNumber, ''];
  
    const x1 = 20;
    const x2 = 50;
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
    doc.text(erfNumber, 140, 60);
  
    doc.text('Market Value:', 110, 66);
    doc.text(marketValue, 140, 66);
  
    doc.text('Street:', 110, 72);
    doc.text(street, 140, 72);
  
    doc.text('Land Area:', 110, 78);
    doc.text('2141.0000', 140, 78);
  
    doc.text('Deposit:', 110, 84);
    doc.text(deposit, 140, 84);
  
    doc.line(5, 110, 205, 110);
  
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('METER READINGS', 80, 116);
  
    const headers = ['Meter No', 'Meter Type', 'Old Reading', 'New Reading', 'Consumption','LEVIED AMOUNT'];
    const data = [[meterNumber, meterType, oldRead, newRead, consumption, leviedAmount]];
  
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
    const data3 = [['', '', 'Opening Balance', '', '', openingBalance], [date, cashPaymentCode, cashPaymentDescription, cashPaymentUnits, cashPaymentTariff, cashPaymentValue], [date, refuseCode, refuseDescription, refuseUnits, refuseTariff, refuseValue], [date, sewerageCode, sewerageDescription, sewerageUnits, sewerageTariff, sewerageValue], [date, waterTariffDomesticCode, waterTariffDomesticDescription, waterTariffDomesticUnits, waterTariffDomesticTariff, waterTariffDomesticValue], ['', vatCode, vatDescription, vatUnits, vatTariff, vatValue], ['', interestCode, interestDescription, interestUnits, interestTariff, interestValue]];
  
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
      startY: doc.autoTable.previous.finalY + 6,
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
  
    var remittanceText = "REMITTANCE\n" +
                     `ACCOUNT NUMBER: ${accountNumber}`+"\n" +
                     `CONSUMER NAME: ${consumerName}`+"\n" +
                     `TOTAL DUE: ${closingBalance}`+"\n" 

doc.text(15, doc.internal.pageSize.height - 40, remittanceText);

// Add Banking Details
var bankingDetailsText = "BANK NAME: FNB\n" +
                         "ACCOUNT NAME: Mohokare Local Municipality\n" +
                         "ACCOUNT NUMBER: 53593549308\n" +
                         "BRANCH CODE: 250655\n" +
                         "REFERENCE: 0100450001";

doc.text(124, doc.internal.pageSize.height - 40, bankingDetailsText);

let leftYeboPay = 85;
doc.addImage(yeboImg, "png", leftYeboPay, doc.internal.pageSize.height - 24, 30, 10);

var linkX = leftYeboPay;
var linkY = doc.internal.pageSize.height - 24;
var linkWidth = 30;
var linkHeight = 10;

// Add a transparent link over the image
doc.link(linkX, linkY, linkWidth, linkHeight, { url: "https://neon-wisp-b1da94.netlify.app" });
  
    doc.save('statement.pdf'); 
  };
  


 

  const [createUserNotification, { loading: createUserNotificationsLoading }] = useMutation(CREATE_USER_NOTIFICATIONS, {
    update(_, result) {
      if (result.data.createUserNotification) {
        alert("Notifications Sent Successfully!")
      } else {
        console.log("Error while ceating notifications!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

  
  const [createUserSmsNotification, { loading: createUserSmsNotificationsLoading }] = useMutation(CREATE_USER_SMS_NOTIFICATIONS, {
    update(_, result) {
      if (result.data.createUserSmsNotification) {
        alert("Sms Notifications Sent Successfully!")
      } else {
        console.log("Error while ceating notifications!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

  const [createUserEmailNotification, { loading: createUserEmailNotificationsLoading }] = useMutation(CREATE_USER_EMAIL_NOTIFICATIONS, {
    update(_, result) {
      if (result.data.createUserEmailNotification) {
        alert("Email Notifications Sent Successfully!")
      } else {
        console.log("Error while ceating notifications!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

  

  const {
    loading: userNotificationLoading,
    data: userNotifications,
    refetch: refetchUserNotificationsData,
  } = useQuery(GET_USER_NOTIFICATIONS);
  
  const handleEyeClick = async (accountNumber) => {
    try {
      // Call refetchUserNotificationsData with the clicked accountNumber
      await refetchUserNotificationsData({ accountNumber });
  
      
  
      // Now you can proceed with the rest of your logic
      handleOpenStat();
    } catch (error) {
      // Handle any errors that may occur during the refetch
      console.error("Error while refetching user notifications:", error);
    }
  };


  const [updateUserDetails, { loading: updateUserDetailsLoading }] = useMutation(UPDATE_USER_DETAILS, {
    update(_, result) {
      if (result.data.updateUserDetails) {
        alert("UserDetails Updated Successfully!")
      } else {
        console.log("Error while updating user details!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });




  const handleEditClick = async (accountNumber) => {
    try {
      await refetchStatementData({ accountNumber });
  
      // The refetch is complete here, so you can log the updated data
   
  
      // Now you can proceed with the rest of your logic
      handleOpenEdit();
    } catch (error) {
      // Handle any errors that may occur during the refetch
      console.error("Error while refetching user data: ", error);
    }
  };

  const handleEditSubmit = async () => {
    if(firstName && lastName && phoneNumber && email && accountNumberEdit)
    updateUserDetails({
      variables: {
        accountNumber: accountNumberEdit,
        firstName,
        lastName,
        phoneNumber,
        email,
      },
    })}




  useEffect(() => {
    if (statementData && statementData.getStatement) {
      setAccountNumberEdit(statementData.getStatement.accountNumber);
      setFirstName(statementData.getStatement.firstName);
      setLastName(statementData.getStatement.lastName);
      setPhoneNumber(statementData.getStatement.phoneNumber);
      setEmail(statementData.getStatement.email);
    }
  }, [statementData]);
  return (
    <>
  
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Mohokare Local Municipality
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
            Download Statement
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

      <Dialog
        open={
          openStat
        }
        size={"xxl"}
        handler={handleOpenStat}
      >
        <DialogHeader>Statement Report</DialogHeader>
        <DialogBody>


<Card>
      
      <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Email Notification History
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
              <tr>
                {["Account Number", "Status", "Date"].map(
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
            {userNotifications && userNotifications?.getUserNotifications?.emails.map((data, index) => (
              
              <tr key={index}>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {data.accountNumber}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {data.status}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {data.createdAt}
                  </Typography>
                </td>
               
              </tr>
            ))}
            
            
          
          </tbody>
        </table>
      </CardBody>
    </Card>

    <div className="custom-divider"></div>;

    <Card>
      
      <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
        <Typography variant="h6" color="white">
          SMS Notification History
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
              <tr>
                {["Account Number", "Status", "Date"].map(
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
            {userNotifications && userNotifications?.getUserNotifications?.sms.map((data, index) => (
              
              <tr key={index}>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                  {data.accountNumber}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {data.status}
                  </Typography>
                </td>
                <td className="py-3 px-5">
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {data.createdAt}
                  </Typography>
                </td>
               
              </tr>
            ))}
            
            
          
          </tbody>
        </table>
      </CardBody>
    </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpenStat(null)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>





















      <Dialog
        open={
          openEdit
        }
        size={"xxl"}
        handler={handleOpenEdit}
      >
        <DialogHeader></DialogHeader>
        <DialogBody>






    <Card>
      
      <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Update Details
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
      <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your name
            </Typography>
            <Input
              size="lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}

            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your surname
            </Typography>
            <Input
              size="lg"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Mills"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
       
       
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your phone number
            </Typography>
            <Input
              size="lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0724586301"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Prefered Communication Method
            </Typography>
            <div >
       <Select label="Select">
         <Option>Email</Option>
         <Option>Phone</Option>
         <Option>Watsapp</Option>
       </Select>
     </div>
               <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="******"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled
              onChange={(e) => setPassword(e.target.value)}
            />

          
          </div>

          <Button variant="text"
          onClick={() => handleEditSubmit()}
          className="mr-1"
            color="white"  style={{marginTop: 12,backgroundColor: "#3855E5"}}>
            Save 
          </Button>

       
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpenEdit(null)}
            className="mr-1"
            style={{marginTop: 12}}
          >
            <span>Cancel</span>
          </Button>
        </form>
      </CardBody>
    </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpenEdit(null)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Button variant="text" color="blue" onClick={handleOpen}  className="mr-1">
            Download all statements
          </Button>
    <div className="mt-12 mb-8 flex flex-col gap-12">

      
      <Typography variant="h40" style={{color: "#3855E5", fontSize: 12, marginBottom: -10}}>
            Search by account number, ID NO, Name
          </Typography>
      <Input
            size="lg"
            type="text"
            placeholder="Search..."
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
          />
      <Card>
      
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Statements
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
                <tr>
                  {["Account Number", "Account Holder", "Indigent", "Indigent Expiry", "Application Date",, "Province"].map(
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
              {filteredStatements && filteredStatements.map((statement, index) => (
                
                <tr key={index}>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                    {statement.accountNumber}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {statement.consumerName}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {statement.isIndigent}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {statement.indigentExpiry}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                    {statement.date && statement.indigentApplicationDate}
                      </Typography>
                  
                  </td>
                
                  <td className="">
                    <Typography
                      className="text-xs font-normal text-blue-gray-500"
                    >
                      {statement.province}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography
                      className="text-xs font-semibold text-blue-gray-500"
                      style={{cursor: 'pointer'}}
                      onClick={() => handleClickDownload(statement.accountNumber)}
                    >
                      Download
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography
                      className="text-xs font-semibold text-blue-gray-500"
                      style={{cursor: 'pointer'}}
                      onClick={() => 
                        createUserSmsNotification({
                          variables: {
                            accountNumber: statement.accountNumber
                          },
                        })}
                    >
                      SMS 
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography
                      className="text-xs font-semibold text-blue-gray-500"
                      style={{cursor: 'pointer'}}
                      onClick={() => 
                        createUserEmailNotification({
                          variables: {
                            accountNumber: statement.accountNumber
                          },
                        })}
                    >
                      Email
                    </Typography>
                  </td>

                  <td className="py-3 px-5">
                  <PencilIcon onClick={() => handleEditClick(statement.accountNumber)} style={{cursor: 'pointer', color: "#FF7E42", fontSize: 30}} className="h-4 w-4 stroke-2" />
                  </td>
                  <td className="py-3 px-5">
                  <EyeIcon onClick={() => handleEyeClick(statement.accountNumber)} style={{cursor: 'pointer', color: "#00E08A", fontSize: 30}} className="h-4 w-4 stroke-2" />
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
