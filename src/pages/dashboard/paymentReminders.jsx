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

import { useMutation } from "@apollo/react-hooks";
import { CREATE_PAYMENT_REMINDERS } from "../../Graphql/Mutations";
 
export function PaymentReminders() {
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedReminderType, setSelectedReminderType] = useState("");
  const [message, setMessage] = useState("");

  const handleAgeChange = (age) => {
    setSelectedAge(age);
  };

  const handleReminderTypeChange = (type) => {
    setSelectedReminderType(type);
  };

  const handleMessageChange = (message) => {
    setMessage(message);
  };


  const [createPaymentReminders, { loading }] = useMutation(CREATE_PAYMENT_REMINDERS, {
    update(_, result) {
      alert(result.data.createPaymentReminders);
    },
    onError(err) {
      
      alert(err);
    }
  });
  
  const handleSendReminders = () => {
    if (loading) {
      return;
    }
  
    createPaymentReminders({
      variables: {
        notificationType: selectedReminderType,
        age: selectedAge.toString(),
        message
      }
    });
  };
  

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
            {/* Select Component for Age */}
            <div className="w-72">
              <Select label="Select Age"  onChange={(e) => handleAgeChange(e)}>
                <Option value="All">All</Option>
                <Option value="days30">+30 DAYS</Option>
                <Option value="days60">+60 DAYS</Option>
                <Option value="days90">+90 DAYS</Option>
                <Option value="days120">+120 DAYS</Option>
              </Select>
            </div>

            {/* Select Component for Reminder Type */}
            <div className="w-72">
              <Select label="Reminder Type" onChange={(e) => handleReminderTypeChange(e)}>
                <Option value="SMS">SMS</Option>
                <Option value="Email">Email</Option>
                <Option value="Both">Both</Option>
              </Select>
            </div>
          </div>
          <br />
          {/* Textarea Component for Message */}
          <div className="w-96">
            <Textarea label="Message" value={message} onChange={(e) => handleMessageChange(e.target.value)} />
          </div>
          <br />
          
          <Button color="blue" onClick={handleSendReminders}>
            Send Reminders
          </Button>
        </div>
      </CardBody>
    </Card>
  </div>
  );
}

export default PaymentReminders;
