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
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import { useQuery } from "@apollo/react-hooks";


import {
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon
} from "@heroicons/react/24/solid";

import { StatisticsCard } from "@/widgets/cards";

import { DayPicker } from "react-day-picker";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon} from "@heroicons/react/24/outline";



import { GET_SUCCESSFUL_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_SUCCESSFUL_SMS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_SMS_COUNT } from "../../Graphql/Queries";
 
export function Home() {

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
    <div className="flex space-x-4">
     {/* Select Component */}
     <div className="w-72">
       <Select label="Select User">
         <Option>John Mills</Option>
         <Option>All</Option>
       </Select>
     </div>

     {/* Popover Component */}
     <div className="w-72">
     <Popover placement="bottom">
       <PopoverHandler>
         <Input
           label="Select a Date"
           onChange={() => null}
         />
       </PopoverHandler>
       <PopoverContent>
         <DayPicker
           // ... (rest of your DayPicker props)
         />
       </PopoverContent>
     </Popover>
    
   </div>
   <div className="w-72">
       <Select label="Report Type">
         <Option>Failed SMSs</Option>
         <Option>Successful SMSs</Option>
         <Option>Failed Emails</Option>
         <Option>Successful Emails</Option>
         <Option>All</Option>
       </Select>
     </div>
 </div>
 <br />
  <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
         <StatisticsCard
           title="Successful SMSs"
           icon={React.createElement(ChatBubbleOvalLeftIcon, {
             className: "w-6 h-6 text-white",
           })}
           footer={
             <Typography className="font-normal text-blue-gray-600">
               <strong className='text-green-500'>{successfulSMSs?.getSuccessfulSmsCount}</strong>
               &nbsp;
             </Typography>
           }
         />
         <StatisticsCard
           title="Failed SMSs"
           icon={React.createElement(ChatBubbleLeftIcon, {
             className: "w-6 h-6 text-white",
           })}
           footer={
             <Typography className="font-normal text-blue-gray-600">
               <strong className='text-red-500'>{failedSMSs?.getFailedSmsCount}</strong>
               &nbsp;
             </Typography>
           }
         />
         

          <StatisticsCard
           title="Succesdful Emails"
           icon={React.createElement(EnvelopeOpenIcon, {
             className: "w-6 h-6 text-white",
           })}
           footer={
             <Typography className="font-normal text-blue-gray-600">
               <strong className='text-green-500'>{successfulEmails?.getSuccessfulEmailsCount}</strong>
               &nbsp;
             </Typography>
           }
         />
          <StatisticsCard
           title="Failed Emails"
           icon={React.createElement(EnvelopeIcon, {
             className: "w-6 h-6 text-white",
           })}
           footer={
             <Typography className="font-normal text-blue-gray-600">
               <strong className='text-red-500'>{failedEmails?.getFailedEmailsCount}</strong>
               &nbsp;
             </Typography>
           }
         />
       <div className="flex gap-2">
         <Chip value="PDF" style={{backgroundColor: "#3855E5"}}/>
         <Chip variant="outlined" value="CSV" />
       </div>
   
     </div>



     <br/>
     <div className="flex flex-wrap gap-4">
     <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg p-5 text-white" style={{backgroundColor: '#FF92B0'}}>
            <ChatBubbleLeftIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              SMSs
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Successful SMSs vs Unsuccessful SMSs
             
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
        <Chart
        options={smsChartOptions}
        series={smsChartSeries}
        type="donut"
        width="380"
      />
    
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg  p-5 text-white" style={{backgroundColor: '#F49C43'}}>
            <EnvelopeIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Emails
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
             Successful emails vs unsuccessful emails
             
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
        <Chart
        options={emailsChartOptions}
        series={emailsChartSeries}
        type="donut"
        width="380"
      />
    
        </CardBody>
      </Card>
      </div>
    </div>
  );
}

export default Home;
