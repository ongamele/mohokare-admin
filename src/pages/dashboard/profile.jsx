import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

export function Profile() {

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState()
  return (
    <section className="m-8 flex gap-4">
    <div className="w-full lg:w-3/5 mt-24">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">New Statement</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Fill in the form and upload the CSV file to complete your submission.</Typography>
      </div>
      <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Name
          </Typography>
          <Input
            size="lg"
            placeholder="John"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Surname
          </Typography>
          <Input
            size="lg"
            placeholder="Mills"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Statement Month
          </Typography>
          <Input
            size="lg"
            placeholder="June"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Year
          </Typography>
          <Input
            size="lg"
            placeholder="2023"
            type="number"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            CSV File
          </Typography>
          <Input
            size="lg"
            type="file"
            placeholder="Mills"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center justify-start font-medium"
            >
              I agree the&nbsp;
              <a
                href="#"
                className="font-normal text-black transition-colors hover:text-gray-900 underline"
              >
                Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button onClick={() => handleLogin()} className="mt-6" fullWidth style={{backgroundColor: "#3855E5"}}>
          Submit Statement
        </Button>

    
      </form>

    </div>

  </section>
  );
}

export default Profile;
