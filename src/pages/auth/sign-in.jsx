import React, { useState, useContext } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context-auth/auth";

import logoBig from "../../images/logoBig.png";
import { LOGIN_ADMIN } from "../../Graphql/Mutations";




export function SignIn() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const [loginAdmin, { loading }] = useMutation(LOGIN_ADMIN, {
    update(_, result) {
      context.login(result.data.loginAdmin);
      navigate("/dashboard/home");
    },
    onError(err) {
      console.log(">>>>> error ", err);
      alert("User Not Found!");
    }
  });

  const handleLogin = () => {
    loginAdmin({
      variables: {
        email,
        password,
      }
    });
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
          <Button onClick={() => handleLogin()} className="mt-6" fullWidth style={{backgroundColor: "#3855E5"}}>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
          
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
       
        
        </form>

      </div>
      <div className="w-3/5 h-full hidden lg:block">
        <img
          src={logoBig}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
