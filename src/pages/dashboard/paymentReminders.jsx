import React, {useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Select,
  Option,
  Popover,
  Textarea,
  Button,
} from "@material-tailwind/react";

import { useQuery } from "@apollo/react-hooks";



import { GET_SUCCESSFUL_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_SUCCESSFUL_SMS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_SMS_COUNT } from "../../Graphql/Queries";
 
export function PaymentReminders() {

  const { data: successfulEmails } = useQuery(GET_SUCCESSFUL_EMAILS_COUNT);
  const { data: successfulSMSs } = useQuery(GET_SUCCESSFUL_SMS_COUNT);
  const { data: failedEmails } = useQuery(GET_FAILED_EMAILS_COUNT);
  const { data: failedSMSs } = useQuery(GET_FAILED_SMS_COUNT);


  const emailsChartOptions = {
    labels: ['Failed', 'Success'],
    colors: ['#FF4560', '#00E08A'],
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
  };
  

  const emailsChartSeries = [Number(failedEmails?.getFailedEmailsCount), Number(successfulEmails?.getSuccessfulEmailsCount)];


  const smsChartOptions = {
    labels: ['Failed', 'Success'],
    colors: ['#FF4560', '#00E08A'],
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
  };
  

  const smsChartSeries = [Number(failedSMSs?.getFailedSmsCount), Number(successfulSMSs?.getSuccessfulSmsCount)];

  return (
    <div className="mt-12">
      <Card>
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
           Send Payment Reminders
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2" style={{padding: 14}}>
          <div>
    <div className="flex space-x-4">
     {/* Select Component */}
     <div className="w-72">
       <Select label="Select Age">
         <Option value="All">All</Option>
         <Option value="+30DAYS">+30 DAYS</Option>
         <Option value="+60DAYS">+60 DAYS</Option>
         <Option value="+90DAYS">+90 DAYS</Option>
         <Option value="+120DAYS">+120 DAYS</Option>
       </Select>
     </div>

     {/* Popover Component */}

   <div className="w-72">
       <Select label="Reminder Type">
         <Option>SMS</Option>
         <Option>Email</Option>
         <Option>Both</Option>
       </Select>
     </div>
     

 </div>
 <br />
 <div className="w-96">
      <Textarea label="Message" />
    </div>
    <br />
    <Button color="blue" onClick={() => alert('Reminders sent successfully')}>
            Send Reminders
          </Button>
</div>
      </CardBody>
      </Card>
  
    </div>
  );
}

export default PaymentReminders;
