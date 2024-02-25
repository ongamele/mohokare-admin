import React, {useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Select,
  Option,
} from "@material-tailwind/react";

import { useQuery } from "@apollo/react-hooks";
import { CSVLink, CSVDownload } from "react-csv";


import {
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon
} from "@heroicons/react/24/solid";

import { StatisticsCard } from "@/widgets/cards";
import Chart from "react-apexcharts";



import { GET_SUCCESSFUL_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_SUCCESSFUL_SMS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_SMS_COUNT } from "../../Graphql/Queries";
import{GET_ALL_NOTIFICATIONS} from '../../Graphql/Queries';

import { GET_FAILED_PAYMENT_REMINDERS_COUNT } from "../../Graphql/Queries";
import { GET_SUCCESSFUL_PAYMENT_REMINDERS_COUNT } from "../../Graphql/Queries";
import { BellAlertIcon } from "@heroicons/react/24/outline";
 
export function Home() {
  const [selectedSmsReportType, setSelectedSmsReportType] = useState('');
  const [selectedEmailReportType, setSelectedEmailReportType] = useState('');
  const [selectedDate, setSelectedDate] = useState();

  const { data: successfulEmails } = useQuery(GET_SUCCESSFUL_EMAILS_COUNT);
  const { data: successfulSMSs } = useQuery(GET_SUCCESSFUL_SMS_COUNT);
  const { data: failedEmails } = useQuery(GET_FAILED_EMAILS_COUNT);
  const { data: failedSMSs } = useQuery(GET_FAILED_SMS_COUNT);
  const { data: allNotifications } = useQuery(GET_ALL_NOTIFICATIONS);


  const { data: failedPaymentReminders } = useQuery(GET_FAILED_PAYMENT_REMINDERS_COUNT);
  const { data: successfulPaymentReminders } = useQuery(GET_SUCCESSFUL_PAYMENT_REMINDERS_COUNT);


  {successfulPaymentReminders && console.log(JSON.stringify(successfulPaymentReminders))}
  const handleSmsReportTypeChange = (smsType) => {
    setSelectedSmsReportType(smsType);
  };

  const handleDateChange = (date) => {
  
    setSelectedDate(date);
  };

  const handleEmailReportTypeChange = (emailType) => {
    
    setSelectedEmailReportType(emailType);
  };
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



  
  const paymentRemindersChartSeries = [Number(failedPaymentReminders?.getFailedPaymentRemindersCount), Number(successfulPaymentReminders?.getSuccessfulPaymentRemindersCount)];


  const paymentRemindersChartOptions = {
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

 

  const filteredNotifications = () => {
    // Check if allNotifications is available and has the expected structure
    if (allNotifications && allNotifications.getAllNotifications) {
      const { emails, sms } = allNotifications.getAllNotifications;
      // Filter notifications based on selected user and report type
      const filteredEmails = emails.filter(email => {
        return (!selectedEmailReportType || email.status === selectedEmailReportType)  &&
        (!selectedDate || email.createdAt.includes(selectedDate));
      });
      const filteredSms = sms.filter(sms => {
        return (!selectedSmsReportType || sms.status === selectedSmsReportType)  &&
        (!selectedDate || sms.createdAt.includes(selectedDate));
      });
      return {
        emails: filteredEmails,
        sms: filteredSms
      };
    }
    return { emails: [], sms: [] };
  };

  const { emails, sms } = filteredNotifications();

  const csvData = [];
  csvData.push(['Type', 'Id', 'Account Number', 'Status', 'Created At']);

  emails.forEach(email => {
    csvData.push(['Email', email.id, email.accountNumber, email.status, email.createdAt]);
  });

  sms.forEach(sms => {
    csvData.push(['SMS', sms.id, sms.accountNumber, sms.status, sms.createdAt]);
  });
  

  const smsChartSeries = [Number(failedSMSs?.getFailedSmsCount), Number(successfulSMSs?.getSuccessfulSmsCount)];
  

  return (
    <div className="mt-12">
    <div className="flex space-x-4">
    <div className="w-72">
  <Select label="Email Report Type" onChange={(e) => handleEmailReportTypeChange(e)}>
    <Option value="Failed">Failed Emails</Option>
    <Option value="Successful">Successful Emails</Option>
  </Select>
</div>


   
<div className="w-72 border border-gray-300 p-2" style={{borderRadius: 6}}>
  <label htmlFor="date">Date</label>
  <input type="date" id="date" name="date" onChange={(e) => handleDateChange(e.target.value)} />
</div>

   <div className="w-72">
       <Select label="SMS Report Type" onChange={(e) => handleSmsReportTypeChange(e)}>
         <Option value="Failed">Failed SMSs</Option>
         <Option value="Successful">Successful SMSs</Option>
       </Select>
     </div>
 </div>
 <br />
  <div className="mb-12 grid gap-y-10 gap-x-4 md:grid-cols-2 xl:grid-cols-4">
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
        {/*} <Chip value="PDF" style={{backgroundColor: "#3855E5"}}/>*/}
         <CSVLink data={csvData} filename={'data.csv'}> <Chip variant="outlined" value="CSV" /></CSVLink>
        
       </div>
   
     </div>



     <br/>
     <div className="flex gap-3">
  <div className="flex flex-col gap-3">
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
          width="320"
        />
      </CardBody>
    </Card>
  </div>
  <div className="flex flex-col gap-3">
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
          width="320"
        />
      </CardBody>
    </Card>
  </div>
  <div className="flex flex-col gap-3">
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg  p-5 text-white" style={{backgroundColor: '#300D9C'}}>
          <BellAlertIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Payment Reminders
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Successful reminders vs unsuccessful reminders
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          options={paymentRemindersChartOptions}
          series={paymentRemindersChartSeries}
          type="donut"
          width="320"
        />
      </CardBody>
    </Card>
  </div>
</div>

    </div>
  );
}

export default Home;
