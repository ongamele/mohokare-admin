import React, {useState} from "react";
import {
  Typography,

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

import { GET_SUCCESSFUL_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_SUCCESSFUL_SMS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_EMAILS_COUNT } from "../../Graphql/Queries";
import { GET_FAILED_SMS_COUNT } from "../../Graphql/Queries";
 
export function Home() {

  const { data: successfulEmails } = useQuery(GET_SUCCESSFUL_EMAILS_COUNT);
  const { data: successfulSMSs } = useQuery(GET_SUCCESSFUL_SMS_COUNT);
  const { data: failedEmails } = useQuery(GET_FAILED_EMAILS_COUNT);
  const { data: failedSMSs } = useQuery(GET_FAILED_SMS_COUNT);
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
    </div>
  );
}

export default Home;
