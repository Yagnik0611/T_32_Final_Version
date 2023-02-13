import { Link } from "react-router-dom";

import { useSignIn } from 'react-auth-kit'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter, Button,
  Typography
} from "@material-tailwind/react";



import React, { Component } from "react";
import { useCallback } from "react";
import { Avatar } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export  function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const singIn = useSignIn()
  const onSubmitLogin = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
      role,
    
    };
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });


      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setSuccessMsg(data.message);

        if (singIn(
          {
            token: data.accessToken,
            expiresIn: 1800,
            tokenType: "Bearer",
            authState: data.username,

          }
        ))

          localStorage.setItem("token", "Bearer " + data.accessToken);
          localStorage.setItem("userId", username);
          localStorage.setItem("role",role)
          console.log(   localStorage.getItem("role"))
            navigate("../../user/home")
         
        
      } else {
        localStorage.removeItem("token");
        const error = await res.json();

        setMsg(error.message);
        setTimeout(() => {
          setMsg("");
          }, 1500);

      }
    } catch (err) {
      console.error(err);
    }
  };
  return (

    <>
      <img

       src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <h3>
              {" "}
              {successMsg ? (
                <div className="text-green-600">{successMsg}</div>
              ) : null}
            </h3>

            <form class="space-y-4 md:space-y-6" action="#">
              <div className="w-full">
                <select
                  className="w-full py-2 px-3 bg-white border border-gray-400 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
                  label="Select Account"
                  name="role"
                value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option
                    className="text-gray-700 m-2 hover:bg-gray-200"
                    value=""
                  >Please select an account</option>
                  <option
                    class="text-gray-700   hover:bg-gray-100"
                    value="admin"
                  >Admin Account</option>
                  <option
                    className="p-2 bg-white"
                    value="client"
                  >Client Account</option>
                  <option selected
                    className="p-2 bg-white"
                    value="user"
                  >User Account</option>
                </select>


              </div>
              <div>
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  type="text"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  required=""
                />{" "}
              </div>
              <div>
                <label
                  for="password"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="•••••••"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <span className="text-red-600"> {msg}</span>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              onClick={onSubmitLogin}
              variant="gradient"
              fullWidth
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
export default SignIn

// export class SignIn extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       ...INITIAL_VALUE,
//       ...loginErr,
      
//     };
    
//   }

  
  
//   onValueChanged = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//       msg: "",
//       success: "",
//     });
//   };
 

//   onSubmitLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/auth/login", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(this.state),
//       });


//       if (res.ok) {
//         const data = await res.json();
//         console.log(data)
//         this.setState({ success: data.message });

//         if(useSignIn(
//           {
//               token: data.accessToken,
//               expiresIn:data.expiresIn,
//               tokenType: "Bearer",
//               authState: data.username,
      
//           }
//       )){
//         localStorage.setItem("token", "Bearer " + data.accessToken);
//         localStorage.setItem("userId", this.state.username);
//         // setTimeout(() => {
//         //   window.location.replace("../dashboard/settings");
//         // }, 1500);
      
//       } 
//       } else {
//         localStorage.removeItem("token");
//         const error = await res.json();
//         this.setState({ msg: error.message });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   render() {
//     return (
//       <>
//         <img
//           src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
//           className="absolute inset-0 z-0 h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
//         <div className="container mx-auto p-4">
//           <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
//             <CardHeader
//               variant="gradient"
//               color="blue"
//               className="mb-4 grid h-28 place-items-center"
//             >
//               <Typography variant="h3" color="white">
//                 Sign In
//               </Typography>
//             </CardHeader>
//             <CardBody className="flex flex-col gap-4">
//               <h3>
//                 {" "}
//                 {this.state.success ? (
//                   <div className="text-green-600">{this.state.success}</div>
//                 ) : null}
//               </h3>

//               <form class="space-y-4 md:space-y-6" action="#">
//               <div className="w-full">
//               <select 
//   className="w-full py-2 px-3 bg-white border border-gray-400 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
//   label="Select Account" 
//   name="role" 
//   onChange={this.onValueChanged}
// >
//   <option 
//     className="text-gray-700 m-2 hover:bg-gray-200" 
//     value="" 
//   >Please select an account</option>
//   <option 
//   class="text-gray-700   hover:bg-gray-100"
//     value="admin"
//   >Admin Account</option>
//   <option 
//     className="p-2 bg-white" 
//     value="client"
//   >Client Account</option>
//   <option selected
//     className="p-2 bg-white" 
//     value="user"
//   >User Account</option>
// </select>


//     </div>
//                 <div>
//                   <label
//                     for="email"
//                     class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Email
//                   </label>
//                   <input
//                     value={this.state.email}
//                     onChange={(event) => this.onValueChanged(event)}
//                     name="username"
//                     type="text"
//                     className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//                     placeholder="name@company.com"
//                     required=""
//                   />{" "}
//                 </div>
//                 <div>
//                   <label
//                     for="password"
//                     class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <input
//                     value={this.state.password}
//                     onChange={(event) => this.onValueChanged(event)}
//                     name="password"
//                     type="password"
//                     className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//                     placeholder="•••••••"
//                     required=""
//                   />
//                 </div>
//                 <div class="flex items-center justify-between">
//                   <div class="flex items-start">
//                     <div class="flex h-5 items-center">
//                       <input
//                         id="remember"
//                         aria-describedby="remember"
//                         type="checkbox"
//                         class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
//                         required=""
//                       />
//                     </div>
//                     <div class="ml-3 text-sm">
//                       <label
//                         for="remember"
//                         class="text-gray-500 dark:text-gray-300"
//                       >
//                         Remember me
//                       </label>
//                     </div>
//                   </div>
//                   <a
//                     href="#"
//                     class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//                 <span className="text-red-600"> {this.state.msg}</span>
//               </form>
//             </CardBody>
//             <CardFooter className="pt-0">
//               <Button
//                 type="submit"
//                 onClick={this.onSubmitLogin}
//                 variant="gradient"
//                 fullWidth
//               >
//                 Sign In
//               </Button>
//               <Typography variant="small" className="mt-6 flex justify-center">
//                 Don't have an account?
//                 <Link to="/auth/sign-up">
//                   <Typography
//                     as="span"
//                     variant="small"
//                     color="blue"
//                     className="ml-1 font-bold"
//                   >
//                     Sign up
//                   </Typography>
//                 </Link>
//               </Typography>
//             </CardFooter>
//           </Card>
//         </div>
//       </>
//     );
//   }
// }
