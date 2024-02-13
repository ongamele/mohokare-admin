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
import "jspdf-autotable";
import { PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { GET_ALL_PAYMENT_ARRANGEMENTS } from "../../Graphql/Queries";

import './styles.css'

export function PaymentArrangements() {
  const [filterValue, setFilterValue] = useState('');
 
  const { data: allPaymentArrangements } = useQuery(GET_ALL_PAYMENT_ARRANGEMENTS);


  const filteredArrangements = allPaymentArrangements?.getAllPaymentArrangements.filter(arrangement =>
    arrangement.accountNumber.includes(filterValue)
    
  );














  return (
    <>
  

    <div className="mt-12 mb-8 flex flex-col gap-12">

      
      <Typography variant="h40" style={{color: "#3855E5", fontSize: 12, marginBottom: -10}}>
            Search by account number
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
            Payment Arrangements
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
                <tr>
                  {["Account Number", "Payment Date", "Amount"].map(
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
              {filteredArrangements && filteredArrangements.map((arrangement, index) => (
                
                <tr key={index}>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                    {arrangement.accountNumber}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {arrangement.paymentDate}
                    </Typography>
                  </td>
                  <td className="py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      R{arrangement.amount}
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

export default PaymentArrangements;
