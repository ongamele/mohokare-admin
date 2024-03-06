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
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
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


  const handleRedirect = (accountNumber) => {
    const url = `https://mohokare-admin.netlify.app/download/${accountNumber}`;
    window.open(url, '_blank');
  };
  return (
    <>
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
                      onClick={() => handleRedirect(statement.accountNumber)}
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
