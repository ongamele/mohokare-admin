import React, {useState} from "react";
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
  Checkbox,
  Select,
Option
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";


export function Customers() {

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  return (
    <>
    <Dialog
        open={
          size === "xxl"
        }
        size={size}
        handler={handleOpen}
      >
        <DialogBody style={{ maxHeight: 'auto', overflowY: 'auto' }}>
        
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Edit Contact Details</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">You can only make changes to user contact details.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your name
            </Typography>
            <Input
              size="lg"
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled

            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your surname
            </Typography>
            <Input
              size="lg"
              placeholder="Mills"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Account Number
            </Typography>
            <Input
              size="lg"
              placeholder="435573"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your phone number
            </Typography>
            <Input
              size="lg"
              value="0724586301"
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
              value="john@mail.com"
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
          <Button className="mt-6"  style={{backgroundColor: "#3855E5"}} fullWidth>
            Save Changes
          </Button>

       
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
            style={{marginTop: 12}}
          >
            <span>Cancel</span>
          </Button>
        </form>

      </div>
      </DialogBody>
    
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
          />
      <Card>
      
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Custommers
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Indegent", "Created", ""].map((el) => (
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
                ({ img, name, email, job, yes, date }, key) => {
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
                          color={yes ? "green" : "blue-gray"}
                          value={yes ? "Yes" : "offline"}
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
                          onClick={() => handleOpen("xxl")}
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
    </div>
    </>
  );
}

export default Customers;
